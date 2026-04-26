const ChangeOwner = require("../models/changeOwner");

// CREATE
exports.create = (req, res) => {
  ChangeOwner.create(req.body, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true, data });
  });
};

// GET ALL
exports.getAll = (req, res) => {
  ChangeOwner.getAll((err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

// GET ONE
exports.getOne = (req, res) => {
  ChangeOwner.getOne(req.params.id, (err, row) => {
    if (err) return res.status(500).json(err);
    res.json(row);
  });
};

// UPDATE
exports.update = (req, res) => {
  ChangeOwner.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// DELETE
exports.delete = (req, res) => {
  ChangeOwner.remove(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.deleteAll = (req, res) => {
  ChangeOwner.deleteAll((err, result) => {
    if (err) return res.status(500).json(err);
    res.json({
      success: true,
      message: "Deleted ALL change_owner data",
      result
    });
  });
};

exports.checkExists = (req, res) => {
  const { brand_account } = req.body;

  if (!brand_account) {
    return res.status(400).json({
      success: false,
      message: "brand_account is required"
    });
  }

  ChangeOwner.checkExists(brand_account, (err, exists) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      exists
    });
  });
};