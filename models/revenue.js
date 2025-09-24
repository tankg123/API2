const db = require("../database/database");

class Revenue {
  static getAll(callback) {
    db.all("SELECT * FROM revenues ORDER BY created_at DESC", callback);
  }

  static getById(id, callback) {
    db.get("SELECT * FROM revenues WHERE id = ?", [id], callback);
  }

  static findByChannelAndDate(idchannel, date, callback) {
    db.get(
      "SELECT * FROM revenues WHERE idchannel = ? AND date = ?",
      [idchannel, date],
      callback
    );
  }

  static create(revenueData, callback) {
    const { idchannel, network, date, views, watch, duration, revenue } =
      revenueData;
    db.run(
      `INSERT INTO revenues (idchannel, network, date, views, watch, duration, revenue)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [idchannel, network, date, views, watch, duration, revenue],
      function (err) {
        callback(err, { id: this.lastID });
      }
    );
  }
  static update(id, revenueData, callback) {
    const { idchannel, network, date, views, watch, duration, revenue } =
      revenueData;
    db.run(
      `UPDATE revenues 
     SET idchannel = ?, network = ?, date = ?, views = ?, watch = ?, duration = ?, revenue = ?
     WHERE id = ?`,
      [idchannel, network, date, views, watch, duration, revenue, id],
      function (err) {
        callback(err, { changes: this.changes });
      }
    );
  }

  static delete(id, callback) {
    db.run("DELETE FROM revenues WHERE id = ?", [id], function (err) {
      callback(err, { changes: this.changes });
    });
  }
}

module.exports = Revenue;
