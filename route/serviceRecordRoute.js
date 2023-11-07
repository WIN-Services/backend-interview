const express = require('express');
const serviceRecordsController = require("../service/serviceRecordsController")

const router = express.Router();

// for add a new service record
router.post('/addService', serviceRecordsController.addNewServiceData);

// for get all service record
router.get("/allServices", serviceRecordsController.getAllServices)

module.exports = router

