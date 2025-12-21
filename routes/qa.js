const express = require("express");
const router = express.Router();
const qaController = require("../controller/qa");

// ===== CREATE & ASK =====
router.post("/", qaController.create);
router.post("/ask", qaController.ask);

// ===== READ =====
router.get("/", qaController.getAll);
router.get("/:id", qaController.getById);

// ===== UPDATE & DELETE =====
router.put("/:id", qaController.update);
router.delete("/:id", qaController.delete);

module.exports = router;
