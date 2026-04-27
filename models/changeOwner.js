const db = require("../database/database");

// CREATE
function create(data, callback) {
  const { brand_account, current_role, email } = data;

  db.run(
    `INSERT INTO change_owner (brand_account, current_role, email) VALUES (?, ?, ?)`,
    [brand_account, current_role, email],
    function (err) {
      if (err) return callback(err);
      callback(null, {
        id: this.lastID,
        brand_account,
        current_role,
        email
      });
    }
  );
}

// GET ALL
function getAll(callback) {
  db.all(`SELECT * FROM change_owner ORDER BY id DESC`, [], callback);
}

// GET ONE
function getOne(id, callback) {
  db.get(`SELECT * FROM change_owner WHERE id = ?`, [id], callback);
}

// UPDATE
function update(id, data, callback) {
  const { brand_account, current_role, email } = data;

  db.run(
    `UPDATE change_owner 
     SET brand_account = ?, current_role = ?, email = ?, updated_at = CURRENT_TIMESTAMP 
     WHERE id = ?`,
    [brand_account, current_role, email, id],
    function (err) {
      if (err) return callback(err);
      callback(null, { updated: this.changes });
    }
  );
}

// DELETE ONE
function remove(id, callback) {
  db.run(`DELETE FROM change_owner WHERE id = ?`, [id], function (err) {
    if (err) return callback(err);
    callback(null, { deleted: this.changes });
  });
}

// DELETE ALL
function deleteAll(callback) {
  db.run(`DELETE FROM change_owner`, [], function (err) {
    if (err) return callback(err);
    callback(null, { deleted: this.changes });
  });
}

// CHECK EXISTS
function checkExists(brand_account, email, callback) {
  db.get(
    `SELECT id FROM change_owner 
     WHERE LOWER(TRIM(brand_account)) = LOWER(TRIM(?))
     AND LOWER(TRIM(email)) = LOWER(TRIM(?))`,
    [brand_account, email],
    (err, row) => {
      if (err) return callback(err);
      callback(null, !!row); // true nếu BOTH match
    }
  );
}

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  deleteAll,
  checkExists
};