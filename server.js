const app = require("./app");

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại https://localhost:${PORT}`);
});
