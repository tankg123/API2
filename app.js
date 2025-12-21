const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const revenueRoutes = require("./routes/revenue");
const channelRoutes = require("./routes/channel");
const qaRoutes = require("./routes/qa"); // ✅ thêm

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/revenue", revenueRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/qa", qaRoutes); // ✅ thêm

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to API",
    version: "1.1.0",
    endpoints: {
      revenue: "/api/revenue",
      channel: "/api/channel",
      qa: "/api/qa",
    },
  });
});

module.exports = app;
