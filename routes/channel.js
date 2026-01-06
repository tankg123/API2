const express = require("express");
const router = express.Router();
const controller = require("../controller/channelController");

router.get("/", controller.getAll);
router.post("/import", controller.importChannel);
router.put("/:id", controller.update);
router.delete("/", controller.removeByCondition);
router.delete("/:id", controller.remove);
console.log("🔥 CHANNEL ROUTES LOADED");


module.exports = router;
