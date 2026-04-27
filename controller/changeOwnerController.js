const ChangeOwner = require("../models/changeOwner");

// CREATE
exports.create = (req, res) => {
  const { brand_account, current_role, email } = req.body;

  // 🔥 VALIDATE BẮT BUỘC
  if (!brand_account || !current_role || !email) {
    return res.status(400).json({
      success: false,
      message: "brand_account, current_role, email are required"
    });
  }

  ChangeOwner.create(req.body, (err, data) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      data
    });
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
  const { brand_account, current_role, email } = req.body;

  if (!brand_account || !current_role || !email) {
    return res.status(400).json({
      success: false,
      message: "brand_account, current_role, email are required"
    });
  }

  ChangeOwner.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// DELETE ONE
exports.delete = (req, res) => {
  ChangeOwner.remove(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// DELETE ALL
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

// CHECK EXISTS
exports.checkExists = (req, res) => {
  const { brand_account, email } = req.body;

  if (!brand_account || !email) {
    return res.status(400).json({
      success: false,
      message: "brand_account and email are required"
    });
  }

  ChangeOwner.checkExists(brand_account, email, (err, exists) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      exists
    });
  });
};