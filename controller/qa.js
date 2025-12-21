const QaModel = require("../models/qa");

// GET ALL
exports.getAll = (req, res) => {
  QaModel.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// GET BY ID
exports.getById = (req, res) => {
  QaModel.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "Not found" });
    res.json(row);
  });
};

// POST ADD
exports.create = (req, res) => {
  const { question, traloi } = req.body;
  if (!question || !traloi) {
    return res.status(400).json({ message: "Question và Traloi là bắt buộc" });
  }

  QaModel.create(question, traloi, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Created", id: result.id });
  });
};

// PUT UPDATE (question hoặc traloi theo id)
exports.update = (req, res) => {
  const { question, traloi } = req.body;

  QaModel.update(req.params.id, question, traloi, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Updated successfully" });
  });
};

// DELETE
exports.delete = (req, res) => {
  QaModel.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Deleted successfully" });
  });
};

// ✅ POST QUESTION → trả về Traloi
exports.ask = (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ message: "Question is required" });
  }

  QaModel.findAnswerByQuestion(question, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!row) {
      return res.json({
        status: "not_found",
        answer: null,
      });
    }

    res.json({
      status: "success",
      answer: row.traloi,
    });
  });
};
