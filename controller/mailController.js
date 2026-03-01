const Mail = require("../models/mail");

exports.create = (req, res) => {
  Mail.createMail(req.body, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

exports.getAll = (req, res) => {
  Mail.getAllMails((err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

exports.getOne = (req, res) => {
  Mail.getMailById(req.params.id, (err, row) => {
    if (err) return res.status(500).json(err);
    res.json(row);
  });
};

exports.update = (req, res) => {
  Mail.updateMail(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated successfully" });
  });
};

exports.delete = (req, res) => {
  Mail.deleteMail(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted successfully" });
  });
};