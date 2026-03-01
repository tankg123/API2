const express = require("express");
const router = express.Router();
const mailController = require("../controller/mailController");

router.post("/", mailController.create);
router.get("/", mailController.getAll);
router.get("/:id", mailController.getOne);
router.put("/:id", mailController.update);
router.delete("/:id", mailController.delete);

module.exports = router;