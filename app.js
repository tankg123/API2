require("dotenv").config(); // ⭐ BẮT BUỘC



const express = require("express");
const cors = require("cors");

const channelRoutes = require("./routes/channel");
const userRoutes = require("./routes/user");
const apiKeyMiddleware = require("./middleware/apiKey");

const app = express();

app.use(cors());
app.use(express.json()); // thay cho body-parser

app.get("/", (req, res) => {
  res.json({ status: "API Channel & User OK" });
});

app.use("/api/channel", apiKeyMiddleware, channelRoutes);
app.use("/api/user", apiKeyMiddleware, userRoutes);

const PORT = process.env.PORT || 3004;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
