const db = require("../database/database");

class Channel {
  // Lấy tất cả channels
  static getAll(callback) {
    db.all("SELECT * FROM channels ORDER BY created_at DESC", callback);
  }

  // Lấy channel theo ID
  static getById(id, callback) {
    db.get("SELECT * FROM channels WHERE id = ?", [id], callback);
  }

  // Tạo channel mới
  static create(channelData, callback) {
    const { name, avatar, subs, views } = channelData;
    db.run(
      `INSERT INTO channels (name, avatar, subs, views)
       VALUES (?, ?, ?, ?)`,
      [name, avatar, subs, views],
      function (err) {
        callback(err, { id: this.lastID });
      }
    );
  }

  // Cập nhật channel
  static update(id, channelData, callback) {
    const { name, avatar, subs, views } = channelData;
    db.run(
      `UPDATE channels 
       SET name = ?, avatar = ?, subs = ?, views = ?
       WHERE id = ?`,
      [name, avatar, subs, views, id],
      function (err) {
        callback(err, { changes: this.changes });
      }
    );
  }

  // Xóa channel
  static delete(id, callback) {
    db.run("DELETE FROM channels WHERE id = ?", [id], function (err) {
      callback(err, { changes: this.changes });
    });
  }
}

module.exports = Channel;
