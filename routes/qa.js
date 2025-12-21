const express = require("express");
const router = express.Router();
const qaController = require("../controller/qa");

// ✅ POST trước
router.post("/", qaController.create);
router.post("/ask", qaController.ask);

// GET
router.get("/", qaController.getAll);
router.get("/:id", qaController.getById);

// UPDATE / DELETE
router.put("/:id", qaController.update);
router.delete("/:id", qaController.delete);

module.exports = router;
