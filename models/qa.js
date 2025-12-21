const db = require("../database/database");

module.exports = {
  getAll(callback) {
    db.all("SELECT * FROM qa ORDER BY id DESC", callback);
  },

  getById(id, callback) {
    db.get("SELECT * FROM qa WHERE id = ?", [id], callback);
  },

  create(question, traloi, callback) {
    db.run(
      "INSERT INTO qa (question, traloi) VALUES (?, ?)",
      [question, traloi],
      function (err) {
        callback(err, { id: this.lastID });
      }
    );
  },

  update(id, question, traloi, callback) {
    db.run(
      "UPDATE qa SET question = ?, traloi = ? WHERE id = ?",
      [question, traloi, id],
      callback
    );
  },

  delete(id, callback) {
    db.run("DELETE FROM qa WHERE id = ?", [id], callback);
  },

  findAnswerByQuestion(question, callback) {
    db.get("SELECT traloi FROM qa WHERE question = ?", [question], callback);
  },
};
