const User = require("../models/user");

// CREATE
exports.create = (req, res) => {
  User.createUser(req.body, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// GET ALL
exports.getAll = (req, res) => {
  User.getAllUsers((err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

// GET ONE
exports.getOne = (req, res) => {
  User.getUserById(req.params.id, (err, row) => {
    if (err) return res.status(500).json(err);
    res.json(row);
  });
};

// UPDATE
exports.update = (req, res) => {
  User.updateUser(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated successfully" });
  });
};

// DELETE
exports.delete = (req, res) => {
  User.deleteUser(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted successfully" });
  });
};
