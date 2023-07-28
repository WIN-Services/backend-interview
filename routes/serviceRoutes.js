const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

//! Create a new service
router.post("/services", serviceController.createService);

//! Get all services
router.get("/services", serviceController.getAllServices);

//! Get a service by ID
router.get("/services/:id", serviceController.getServiceById);

//! Update a service by ID
router.put("/services/:id", serviceController.updateService);

//! Delete a service by ID
router.delete("/services/:id", serviceController.deleteService);

module.exports = router;
