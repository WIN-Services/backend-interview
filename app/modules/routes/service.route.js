const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/service.controller");

router.post("/create", serviceController.addService);
router.put("/update/:serviceId", serviceController.updateService);
router.delete("/delete/:serviceId", serviceController.deleteService);
router.get("/all", serviceController.allService);
router.get("/filter", serviceController.getServicesByFilters);

module.exports = router;