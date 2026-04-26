const db = require("../database/database");

// CREATE
function create(data, callback) {
  const { brand_account, current_role } = data;

  db.run(
    `INSERT INTO change_owner (brand_account, current_role) VALUES (?, ?)`,
    [brand_account, current_role],
    function (err) {
      if (err) return callback(err);
      callback(null, {
        id: this.lastID,
        brand_account,
        current_role
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
  const { brand_account, current_role } = data;

  db.run(
    `UPDATE change_owner 
     SET brand_account = ?, current_role = ?, updated_at = CURRENT_TIMESTAMP 
     WHERE id = ?`,
    [brand_account, current_role, id],
    function (err) {
      if (err) return callback(err);
      callback(null, { updated: this.changes });
    }
  );
}

// DELETE
function remove(id, callback) {
  db.run(`DELETE FROM change_owner WHERE id = ?`, [id], function (err) {
    if (err) return callback(err);
    callback(null, { deleted: this.changes });
  });
}

// 🔥 DELETE ALL
function deleteAll(callback) {
  db.run(`DELETE FROM change_owner`, [], function (err) {
    if (err) return callback(err);
    callback(null, { deleted: this.changes });
  });
}

function checkExists(brand_account, callback) {
  db.get(
    `SELECT id FROM change_owner WHERE brand_account = ?`,
    [brand_account],
    (err, row) => {
      if (err) return callback(err);
      callback(null, !!row); // true nếu tồn tại
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