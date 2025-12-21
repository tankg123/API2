const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.resolve(__dirname, "../data/revenues.db"),
  (err) => {
    if (err) {
      console.error("Không thể kết nối database:", err.message);
    } else {
      console.log("Kết nối SQLite thành công!");
    }
  }
);

db.serialize(() => {
  // revenues
  db.run(`
    CREATE TABLE IF NOT EXISTS revenues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      idchannel TEXT NOT NULL,
      network TEXT NOT NULL,
      date TEXT,
      views INTEGER,
      watch INTEGER,
      duration INTEGER,
      revenue REAL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // channels
  db.run(`
    CREATE TABLE IF NOT EXISTS channels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      avatar TEXT,
      subs INTEGER DEFAULT 0,
      views INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ✅ QA – Question / Traloi
  db.run(`
    CREATE TABLE IF NOT EXISTS qa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      traloi TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
