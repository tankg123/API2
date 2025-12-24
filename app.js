const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const qaRoutes = require("./routes/qa");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ status: "API Revenue OK" });
});

app.use("/api/api2, qaRoutes);

const PORT = process.env.PORT || 3004;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
