const app = require("./app");

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại https://localhost:${PORT}`);
});
