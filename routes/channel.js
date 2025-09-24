const express = require("express");
const router = express.Router();
const channelController = require("../controller/channel");

router.get("/", channelController.getAllchannels);
router.get("/:id", channelController.getchannelById);
router.post("/", channelController.createchannel);
router.put("/:id", channelController.updatechannel);
router.delete("/:id", channelController.deletechannel);

module.exports = router;
