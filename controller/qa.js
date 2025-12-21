const QA = require("../models/qa");

module.exports = {
  getAll: async (req, res) => {
    const data = await QA.getAll();
    res.json({ status: "success", data });
  },

  ask: async (req, res) => {
    const { question } = req.body;
    if (!question) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing question" });
    }

    const row = await QA.getByQuestion(question);
    if (!row) {
      return res.json({ status: "not_found", traloi: null });
    }

    res.json({ status: "success", traloi: row.traloi });
  },

  create: async (req, res) => {
    const { question, traloi } = req.body;
    const result = await QA.insert(question, traloi);
    res.json({ status: "created", id: result.id });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { question, traloi } = req.body;

    const result = await QA.update(id, question, traloi);
    res.json({ status: "updated", changes: result.changes });
  },

  remove: async (req, res) => {
    const { id } = req.params;
    const result = await QA.delete(id);
    res.json({ status: "deleted", changes: result.changes });
  },
};
