const express = require("express");
const router = express.Router();
const controller = require("../controller/channelController");

router.get("/", controller.getAll);
router.post("/import", controller.importChannel);
router.put("/:id", controller.update);
router.delete("/", controller.removeByCondition);
router.delete("/:id", controller.remove);
router.post("/delete-by-revenue", controller.removeByRevenue);
router.post("/revenue-by-month", controller.getRevenueByMonth);
router.post("/revenue-by-month-network", controller.getRevenueByMonthNetwork);
console.log("🔥 CHANNEL ROUTES LOADED");


module.exports = router;
