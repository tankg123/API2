const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../data/qa.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Lỗi kết nối SQLite", err);
  } else {
    console.log("✅ Kết nối SQLite thành công!");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS qa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT UNIQUE,
    traloi TEXT
  )
`);

module.exports = db;
