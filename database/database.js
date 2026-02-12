const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/database.db");

db.serialize(() => {
  // ===== TABLE CHANNELS (GIỮ NGUYÊN) =====
  db.run(`
    CREATE TABLE IF NOT EXISTS channels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      channel_name TEXT,
      channel_id TEXT,
      revenue REAL,
      network TEXT,
      month_revenue TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ===== TABLE USERS (THÊM MỚI) =====
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Use TEXT,
      Pass TEXT,
      Status TEXT DEFAULT 'activate',
      Creator DATETIME DEFAULT CURRENT_TIMESTAMP,
      hwid TEXT
    )
  `);
});

module.exports = db;
