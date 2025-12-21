const express = require("express");
const router = express.Router();
const qaController = require("../controller/qa");

router.get("/", qaController.getAll);
router.get("/:id", qaController.getById);
router.post("/", qaController.create);
router.put("/:id", qaController.update);
router.delete("/:id", qaController.delete);

// ✅ hỏi – trả lời
router.post("/ask", qaController.ask);

module.exports = router;
