const db = require("../database/database");

class Revenue {
  // Lấy tất cả revenues
  static getAll(callback) {
    db.all("SELECT * FROM revenues ORDER BY created_at DESC", callback);
  }

  // Lấy revenue theo ID
  static getById(id, callback) {
    db.get("SELECT * FROM revenues WHERE id = ?", [id], callback);
  }

  // Tạo revenue mới
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

  // Cập nhật revenue
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

  // Xóa revenue
  static delete(id, callback) {
    db.run("DELETE FROM revenues WHERE id = ?", [id], function (err) {
      callback(err, { changes: this.changes });
    });
  }
}

module.exports = Revenue;
