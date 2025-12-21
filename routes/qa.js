const express = require("express");
const router = express.Router();
const controller = require("../controllers/qaController");

// GET ALL
router.get("/", controller.getAll);

// POST text Question → trả về Traloi
router.post("/ask", controller.ask);

// POST add
router.post("/", controller.create);

// PUT update theo id
router.put("/:id", controller.update);

// DELETE theo id
router.delete("/:id", controller.remove);

module.exports = router;
