const axios = require("axios");
const Channel = require("../models/channel");

async function getChannelName(channelId) {
  try {
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
  } catch (err) {
    // ❗ Không throw – để fallback bên dưới
    return null;
  }
}

/**
 * POST /import
 * REQUIRED: channel_id, revenue, network, month_revenue
 */
exports.importChannel = async (req, res) => {
  try {
    const { channel_id, revenue, network, month_revenue } = req.body;

    // 🔒 VALIDATE ĐỦ 4 TRƯỜNG
    if (
      !channel_id ||
      revenue == null ||
      !network ||
      !month_revenue
    ) {
      return res.status(400).json({
        error: "channel_id, revenue, network, month_revenue are required"
      });
    }

    // ✅ Nếu không lấy được name → fallback
    const fetchedName = await getChannelName(channel_id);
    const channel_name = fetchedName || "Channel Lỗi";

    const finalRevenue = Number(revenue);

    Channel.insert(
      [channel_name, channel_id, finalRevenue, network, month_revenue],
      (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({
          success: true,
          channel_name,
          channel_id,
          revenue: finalRevenue,
          network,
          month_revenue
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
  const {
    channel_id,
    channel_name,
    revenue,
    network,
    month_revenue
  } = req.body;

  Channel.getById(id, async (err, row) => {
    if (!row) {
      return res.status(404).json({ error: "Record not found" });
    }

    let finalName = channel_name || row.channel_name;
    let finalChannelId = channel_id || row.channel_id;
    let finalRevenue =
      revenue != null ? Number(revenue) : row.revenue;
    let finalNetwork = network || row.network;
    let finalMonth = month_revenue || row.month_revenue;

    // ✅ Nếu đổi channel_id mà không truyền channel_name
    // → thử fetch, nếu fail thì dùng "Channel Lỗi"
    if (channel_id && !channel_name) {
      const fetchedName = await getChannelName(channel_id);
      finalName = fetchedName || "Channel Lỗi";
    }

    Channel.update(
      id,
      [
        finalName,
        finalChannelId,
        finalRevenue,
        finalNetwork,
        finalMonth
      ],
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
          network: finalNetwork,
          month_revenue: finalMonth
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


exports.removeByCondition = (req, res) => {
  console.log("HEADERS:", req.headers["content-type"]);
  console.log("BODY:", req.body);
  const { month_revenue, network } = req.body;

  if (!month_revenue || !network) {
    return res.status(400).json({
      message: "month_revenue and network are required"
    });
  }

  Channel.removeByCondition(month_revenue, network, (err, deleted) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      success: true,
      deleted
    });
  });
};

