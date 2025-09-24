const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const revenueRoutes = require("./routes/revenue");
const channelRoutes = require("./routes/channel");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/revenues", revenueRoutes);
app.use("/api/channels", channelRoutes);

// Route mặc định
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to API",
    version: "1.0.0",
    endpoints: {
      revenues: "/api/revenue",
      channels: "/api/channel",
    },
  });
});

module.exports = app;
