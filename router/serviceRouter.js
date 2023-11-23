const express = require("express");

const router = express.Router();
const serviceController = require("../controller/serviceController");

router.get("/services", serviceController.getAllServices);
router.get("/services/:id", serviceController.getServiceById);
router.post("/services", serviceController.createServices);
router.put("/services/:id", serviceController.updateServiceById);
router.delete("/services/:id", serviceController.deleteServiceById);

module.exports = router;
