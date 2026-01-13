require("dotenv").config();

const axios = require("axios");
const cron = require("node-cron");
const Channel = require("../models/channel");

/**
 * Check channel sống/chết theo YouTube Data API v3
 * ❗ CHỈ trả die khi Google xác nhận channelNotFound
 */
async function checkChannelAlive(channelId) {
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

    // ❗ items có dữ liệu → CHẮC CHẮN ALIVE
    if (res.data.items && res.data.items.length > 0) {
      return { alive: true };
    }

    // ❗ items rỗng → CHANNEL KHÔNG TỒN TẠI / DIE
    return { alive: false, reason: "items_empty" };

  } catch (err) {
    if (err.response) {
      const reason =
        err.response.data?.error?.errors?.[0]?.reason;

      // ❗ Google xác nhận không tồn tại
      if (reason === "channelNotFound") {
        return { alive: false, reason: "channelNotFound" };
      }

      // ❌ quota / forbidden / 500 → KHÔNG kết luận die
      return { alive: true, reason: "api_error" };
    }

    // ❌ network / timeout → KHÔNG kết luận die
    return { alive: true, reason: "network_error" };
  }
}


/**
 * CRON JOB

 */
cron.schedule("0 1 * * *", async () => {
  console.log("🔥 CRON TEST RUN", new Date().toISOString());

  Channel.getAllChannelIds(async (err, rows) => {
    if (err) {
      console.error("❌ DB error:", err);
      return;
    }

    for (const row of rows) {
      const channelId = row.channel_id;
      const result = await checkChannelAlive(channelId);

      // ❗ FIX LOGIC: kiểm tra result.alive
      if (!result.alive) {
        Channel.updateStatusByChannelId(
          channelId,
          "die",
          () => {
            console.log(`☠️ Channel confirmed died: ${channelId}`);
          }
        );
      } else {
        console.log(`✅ Channel alive: ${channelId}`);
      }
    }

    console.log("✅ Daily Channel Health Check finished");
  });
});
