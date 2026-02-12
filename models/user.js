const db = require("../database/database");

// CREATE USER
exports.createUser = (data, callback) => {
  const { Use, Pass, Status, hwid } = data;

  db.run(
    `INSERT INTO users (Use, Pass, Status, hwid)
     VALUES (?, ?, ?, ?)`,
    [Use, Pass, Status || "activate", hwid],
    function (err) {
      callback(err, { id: this.lastID });
    }
  );
};

// GET ALL USERS
exports.getAllUsers = (callback) => {
  db.all("SELECT * FROM users ORDER BY id DESC", [], callback);
};

// GET USER BY ID
exports.getUserById = (id, callback) => {
  db.get("SELECT * FROM users WHERE id = ?", [id], callback);
};

// UPDATE USER
exports.updateUser = (id, data, callback) => {
  const { Use, Pass, Status, hwid } = data;

  db.run(
    `UPDATE users
     SET Use = ?, Pass = ?, Status = ?, hwid = ?
     WHERE id = ?`,
    [Use, Pass, Status, hwid, id],
    callback
  );
};

// DELETE USER
exports.deleteUser = (id, callback) => {
  db.run("DELETE FROM users WHERE id = ?", [id], callback);
};
