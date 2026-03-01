const db = require("../database/database");

// CREATE
function createMail(data, callback) {
  const { user, pass } = data;

  db.run(
    "INSERT INTO mails (user, pass) VALUES (?, ?)",
    [user, pass],
    function (err) {
      if (err) return callback(err);
      callback(null, { success: true, id: this.lastID, user, pass, created_at: new Date().toISOString() });
    }
  );
}

// GET ALL
function getAllMails(callback) {
  db.all("SELECT * FROM mails ORDER BY id DESC", [], callback);
}

// GET ONE
function getMailById(id, callback) {
  db.get("SELECT * FROM mails WHERE id = ?", [id], callback);
}

// UPDATE
function updateMail(id, data, callback) {
  const { user, pass } = data;

  db.run(
    "UPDATE mails SET user = ?, pass = ? WHERE id = ?",
    [user, pass, id],
    callback
  );
}

// DELETE
function deleteMail(id, callback) {
  db.run("DELETE FROM mails WHERE id = ?", [id], callback);
}

module.exports = {
  createMail,
  getAllMails,
  getMailById,
  updateMail,
  deleteMail
};