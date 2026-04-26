require("dotenv").config(); // ⭐ BẮT BUỘC


const express = require("express");
const cors = require("cors");

const channelRoutes = require("./routes/channel");
const userRoutes = require("./routes/user");
const mailRoutes = require("./routes/mail");
const changeOwnerRoutes = require("./routes/changeOwner");
const apiKeyMiddleware = require("./middleware/apiKey");
console.log("channelRoutes:", typeof channelRoutes);
console.log("userRoutes:", typeof userRoutes);
console.log("mailRoutes:", typeof mailRoutes);
console.log("changeOwnerRoutes:", typeof changeOwnerRoutes);

const app = express();

app.use(cors());
app.use(express.json()); // thay cho body-parser

app.get("/", (req, res) => {
  res.json({ status: "API Channel & User OK" });
});

app.use("/api/channel", apiKeyMiddleware, channelRoutes);
app.use("/api/user", apiKeyMiddleware, userRoutes);
app.use("/api/mail", apiKeyMiddleware, mailRoutes);
app.use("/api/change-owner", apiKeyMiddleware, changeOwnerRoutes);

const PORT = process.env.PORT || 3004;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
  
});
