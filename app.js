const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const qaRoutes = require("./routes/channel");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ status: "API Channel OK" });
});

app.use("/api/channel", qaRoutes);

const PORT = process.env.PORT || 3004;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
