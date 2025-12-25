const axios = require("axios");
const Channel = require("../models/channel");

async function getChannelName(channelId) {
  const res = await axios.get(
    "https://www.googleapis.com/youtube/v3/channels",
    {
      params: {
        part: "snippet",
        id: channelId,
        key: process.env.YOUTUBE_API_KEY
      }
    }
  );

  if (!res.data.items.length) return null;
  return res.data.items[0].snippet.title;
}

/**
 * POST /import
 */
exports.importChannel = async (req, res) => {
  try {
    const { channel_id, revenue } = req.body;

    if (!channel_id || revenue == null) {
      return res.status(400).json({ error: "Missing channel_id or revenue" });
    }

    const channel_name = await getChannelName(channel_id);
    if (!channel_name) {
      return res.status(404).json({ error: "Channel not found" });
    }

    Channel.insert(
      [channel_name, channel_id, revenue],
      () => {
        res.json({
          success: true,
          channel_name,
          channel_id,
          revenue
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /
 */
exports.getAll = (req, res) => {
  Channel.getAll((err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

/**
 * PUT /:id
 */
exports.update = async (req, res) => {
  const { id } = req.params;
  const { channel_id, channel_name, revenue } = req.body;

  Channel.getById(id, async (err, row) => {
    if (!row) {
      return res.status(404).json({ error: "Record not found" });
    }

    let finalName = channel_name || row.channel_name;
    let finalChannelId = channel_id || row.channel_id;
    let finalRevenue = revenue ?? row.revenue;

    // Nếu đổi Channel ID nhưng không nhập name → tự fetch lại
    if (channel_id && !channel_name) {
      const fetchedName = await getChannelName(channel_id);
      if (!fetchedName) {
        return res.status(404).json({ error: "Channel ID invalid" });
      }
      finalName = fetchedName;
    }

    Channel.update(
      id,
      [finalName, finalChannelId, finalRevenue],
      () => {
        res.json({
          success: true,
          id,
          channel_name: finalName,
          channel_id: finalChannelId,
          revenue: finalRevenue
        });
      }
    );
  });
};

/**
 * DELETE /:id
 */
exports.remove = (req, res) => {
  const { id } = req.params;

  Channel.remove(id, () => {
    res.json({
      success: true,
      deleted_id: id
    });
  });
};
