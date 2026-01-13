require("dotenv").config(); // ⭐ BẮT BUỘC
console.log("🚀 ChannelHealthCheck service loaded");
require("./services/channelHealthCheck");



const express = require("express");
const cors = require("cors");

const channelRoutes = require("./routes/channel");

const app = express();

app.use(cors());
app.use(express.json()); // thay cho body-parser

app.get("/", (req, res) => {
  res.json({ status: "API Channel OK" });
});

app.use("/api/channel", channelRoutes);

const PORT = process.env.PORT || 3004;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
