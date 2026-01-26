const db = require("../database/database");

/**
 * INSERT – mỗi lần POST = 1 record mới
 */
exports.insert = (data, cb) => {
  const sql = `
    INSERT INTO channels
    (channel_name, channel_id, revenue, network, month_revenue, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, data, cb);
};

exports.getAll = (cb) => {
  db.all(
    "SELECT * FROM channels ORDER BY id DESC",
    cb
  );
};

exports.getById = (id, cb) => {
  db.get(
    "SELECT * FROM channels WHERE id = ?",
    [id],
    cb
  );
};

exports.update = (id, data, cb) => {
  const sql = `
    UPDATE channels
    SET
      channel_name = ?,
      channel_id = ?,
      revenue = ?,
      network = ?,
      month_revenue = ?,
      status = ?
    WHERE id = ?
  `;
  db.run(sql, [...data, id], cb);
};

exports.remove = (id, cb) => {
  db.run(
    "DELETE FROM channels WHERE id = ?",
    [id],
    cb
  );
};

/**
 * Delete theo điều kiện (month_revenue + network)
 */
exports.removeByCondition = (month_revenue, network, cb) => {
  db.run(
    "DELETE FROM channels WHERE month_revenue = ? AND network = ?",
    [month_revenue, network],
    function (err) {
      cb(err, this?.changes || 0);
    }
  );
};
