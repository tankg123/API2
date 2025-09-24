const express = require("express");
const router = express.Router();
const revenueController = require("../controller/revenue");

router.get("/", revenueController.getAllrevenues);
router.get("/:id", revenueController.getrevenueById);
router.post("/", revenueController.createrevenue);
router.put("/:id", revenueController.updaterevenue);
router.delete("/:id", revenueController.deleterevenue);

module.exports = router;
