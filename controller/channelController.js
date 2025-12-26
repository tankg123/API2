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

  if (!res.data.items || !res.data.items.length) return null;
  return res.data.items[0].snippet.title;
}

/**
 * POST /import
 * REQUIRED: channel_id, revenue, network
 */
exports.importChannel = async (req, res) => {
  try {
    const { channel_id, revenue, network } = req.body;

    if (!channel_id || revenue == null || !network) {
      return res.status(400).json({
        error: "channel_id, revenue, network are required"
      });
    }

    const channel_name = await getChannelName(channel_id);
    if (!channel_name) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const finalRevenue = Number(revenue);

    Channel.insert(
      [channel_name, channel_id, finalRevenue, network],
      (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({
          success: true,
          channel_name,
          channel_id,
          revenue: finalRevenue,
          network
        });
      }
    );
  } catch (err) {
    if (err.response) {
      return res.status(500).json({
        google_status: err.response.status,
        google_error: err.response.data
      });
    }
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
  const { channel_id, channel_name, revenue, network } = req.body;

  Channel.getById(id, async (err, row) => {
    if (!row) {
      return res.status(404).json({ error: "Record not found" });
    }

    let finalName = channel_name || row.channel_name;
    let finalChannelId = channel_id || row.channel_id;
    let finalRevenue = revenue != null ? Number(revenue) : row.revenue;
    let finalNetwork = network || row.network;

    if (channel_id && !channel_name) {
      const fetchedName = await getChannelName(channel_id);
      if (!fetchedName) {
        return res.status(404).json({ error: "Channel ID invalid" });
      }
      finalName = fetchedName;
    }

    Channel.update(
      id,
      [finalName, finalChannelId, finalRevenue, finalNetwork],
      (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({
          success: true,
          id,
          channel_name: finalName,
          channel_id: finalChannelId,
          revenue: finalRevenue,
          network: finalNetwork
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

  Channel.remove(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      success: true,
      deleted_id: id
    });
  });
};
