const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const revenueRoutes = require("./routes/revenue");
const channelRoutes = require("./routes/channel");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/revenue", revenueRoutes);
app.use("/api/channel", channelRoutes);

// Route mặc định
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to API",
    version: "1.0.0",
    endpoints: {
      revenues: "/api/revenues",
      channels: "/api/channels",
    },
  });
});

module.exports = app;
