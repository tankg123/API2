const express = require("express");
const router = express.Router();
const controller = require("../controller/changeOwnerController");

router.post("/", controller.create);
router.post("/check", controller.checkExists);

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);
router.delete("/", controller.deleteAll);

module.exports = router;