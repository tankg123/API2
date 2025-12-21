const QA = require("../models/qa");

exports.getAll = async (req, res) => {
  try {
    const data = await QA.getAll();
    res.json({ status: "success", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.ask = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Missing question" });
    }

    const row = await QA.getByQuestion(question);
    if (!row) {
      return res.json({ status: "not_found", traloi: null });
    }

    res.json({ status: "success", traloi: row.traloi });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { question, traloi } = req.body;
    const result = await QA.insert(question, traloi);
    res.json({ status: "created", id: result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, traloi } = req.body;

    const result = await QA.update(id, question, traloi);
    res.json({ status: "updated", changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await QA.delete(id);
    res.json({ status: "deleted", changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
