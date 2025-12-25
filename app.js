require("dotenv").config();
const express = require("express");
const cors = require("cors");

const channelRoutes = require("./routes/channel");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/channel", channelRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
});
