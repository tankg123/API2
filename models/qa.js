const db = require("../database/database");

module.exports = {
  getAll: () =>
    new Promise((resolve, reject) => {
      db.all("SELECT * FROM qa", [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    }),

  getByQuestion: (question) =>
    new Promise((resolve, reject) => {
      db.get("SELECT * FROM qa WHERE question = ?", [question], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    }),

  insert: (question, traloi) =>
    new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO qa (question, traloi) VALUES (?, ?)",
        [question, traloi],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    }),

  update: (id, question, traloi) =>
    new Promise((resolve, reject) => {
      db.run(
        "UPDATE qa SET question = ?, traloi = ? WHERE id = ?",
        [question, traloi, id],
        function (err) {
          if (err) reject(err);
          else resolve({ changes: this.changes });
        }
      );
    }),

  delete: (id) =>
    new Promise((resolve, reject) => {
      db.run("DELETE FROM qa WHERE id = ?", [id], function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    }),
};
