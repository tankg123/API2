const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS channels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      channel_name TEXT,
      channel_id TEXT UNIQUE,
      revenue REAL,
      network TEXT,
      month_revenue TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
