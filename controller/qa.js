const QaModel = require("../models/qa");

// GET ALL
exports.getAll = (req, res) => {
  QaModel.getAll((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// GET BY ID
exports.getById = (req, res) => {
  QaModel.getById(req.params.id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(row);
  });
};

// POST ADD
exports.create = (req, res) => {
  const { question, traloi } = req.body;

  if (!question || !traloi) {
    return res.status(400).json({
      message: "question và traloi là bắt buộc",
    });
  }

  QaModel.create(question, traloi, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      status: "success",
      id: result.id,
    });
  });
};

// PUT UPDATE
exports.update = (req, res) => {
  const { question, traloi } = req.body;

  QaModel.update(req.params.id, question, traloi, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ status: "updated" });
  });
};

// DELETE
exports.delete = (req, res) => {
  QaModel.delete(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ status: "deleted" });
  });
};

// ✅ ASK – TUYỆT ĐỐI KHÔNG DÙNG traloi
exports.ask = (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({
      message: "question is required",
    });
  }

  QaModel.findAnswerByQuestion(question, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.json({
        status: "not_found",
        answer: null,
      });
    }

    // ✅ DÒNG QUYẾT ĐỊNH – FIX LỖI
    return res.json({
      status: "success",
      answer: row.traloi,
    });
  });
};
