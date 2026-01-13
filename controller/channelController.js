const axios = require("axios");
const Channel = require("../models/channel");

/**
 * Lấy tên channel – fallback nếu lỗi
 */
async function getChannelName(channelId) {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet",
          id: channelId,
          key: process.env.YOUTUBE_API_KEY
        },
        timeout: 10000
      }
    );

    if (!res.data.items || !res.data.items.length) return null;
    return res.data.items[0].snippet.title;
  } catch {
    return null;
  }
}

/**
 * Chuẩn hoá Channel ID (tự thêm UC nếu thiếu)
 */
function normalizeChannelId(channelId) {
  if (!channelId) return channelId;
  const id = channelId.trim();
  return id.startsWith("UC") ? id : "UC" + id;
}

/**
 * Check trạng thái channel (active / die)
 * Quy ước:
 * - items > 0  → active
 * - items = [] → die
 * - quota / network / 403 → active (không kết luận chết)
 */
async function checkChannelStatus(channelId) {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "id",
          id: channelId,
          key: process.env.YOUTUBE_API_KEY
        },
        timeout: 10000
      }
    );

    if (res.data.items && res.data.items.length > 0) {
      return "active";
    }

    return "die";

  } catch (err) {
    if (err.response) {
      const reason =
        err.response.data?.error?.errors?.[0]?.reason;

      if (reason === "channelNotFound") {
        return "die";
      }
    }

    return "active";
  }
}

/**
 * POST /import
 * REQUIRED: channel_id, revenue, network, month_revenue
 * ACTION:
 * - normalize channel_id
 * - check status ngay
 * - fallback channel_name nếu lỗi
 */
exports.importChannel = async (req, res) => {
  try {
    const { revenue, network, month_revenue } = req.body;
    const channel_id = normalizeChannelId(req.body.channel_id);

    if (!channel_id || revenue == null || !network || !month_revenue) {
      return res.status(400).json({
        error: "channel_id, revenue, network, month_revenue are required"
      });
    }

    // 1️⃣ Check status NGAY khi import
    const status = await checkChannelStatus(channel_id);

    // 2️⃣ Lấy channel name (fallback)
    const fetchedName = await getChannelName(channel_id);
    const channel_name = fetchedName || "Channel Lỗi";

    const finalRevenue = Number(revenue);

    Channel.insert(
      [
        channel_name,
        channel_id,
        finalRevenue,
        network,
        month_revenue,
        status
      ],
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
          month_revenue,
          status
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
    month_revenue,
    status
  } = req.body;

  Channel.getById(id, async (err, row) => {
    if (!row) {
      return res.status(404).json({ error: "Record not found" });
    }

    const finalChannelId = channel_id
      ? normalizeChannelId(channel_id)
      : row.channel_id;

    let finalName = channel_name || row.channel_name;
    let finalRevenue =
      revenue != null ? Number(revenue) : row.revenue;
    let finalNetwork = network || row.network;
    let finalMonth = month_revenue || row.month_revenue;
    let finalStatus = status || row.status;

    if (channel_id && !channel_name) {
      const fetchedName = await getChannelName(finalChannelId);
      finalName = fetchedName || "Channel Lỗi";
    }

    Channel.update(
      id,
      [
        finalName,
        finalChannelId,
        finalRevenue,
        finalNetwork,
        finalMonth,
        finalStatus
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
          month_revenue: finalMonth,
          status: finalStatus
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

/**
 * DELETE by condition (month_revenue + network)
 */
exports.removeByCondition = (req, res) => {
  const { month_revenue, network } = req.body;

  if (!month_revenue || !network) {
    return res.status(400).json({
      message: "month_revenue and network are required"
    });
  }

  Channel.removeByCondition(
    month_revenue,
    network,
    (err, deleted) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        success: true,
        deleted
      });
    }
  );
};
