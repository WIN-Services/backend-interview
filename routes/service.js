const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service_controller");

router.post("/", serviceController.createService);
router.get("/:id", serviceController.getService);
router.get("/", serviceController.getAllServices);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

module.exports = router;