const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const qaRoutes = require("./routes/qa");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/qa", qaRoutes);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
