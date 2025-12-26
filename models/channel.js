const db = require("../database/database");

exports.insert = (data, cb) => {
  const sql = `
    INSERT OR REPLACE INTO channels
    (channel_name, channel_id, revenue, network)
    VALUES (?, ?, ?, ?)
  `;
  db.run(sql, data, cb);
};

exports.getAll = (cb) => {
  db.all("SELECT * FROM channels ORDER BY id DESC", cb);
};

exports.getById = (id, cb) => {
  db.get("SELECT * FROM channels WHERE id = ?", [id], cb);
};

exports.update = (id, data, cb) => {
  const sql = `
    UPDATE channels
    SET channel_name = ?, channel_id = ?, revenue = ?, network = ?
    WHERE id = ?
  `;
  db.run(sql, [...data, id], cb);
};

exports.remove = (id, cb) => {
  db.run("DELETE FROM channels WHERE id = ?", [id], cb);
};
