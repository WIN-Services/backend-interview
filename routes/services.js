const express = require("express")
const router = express.Router();
const servicesController = require('../controllers/services')


router.get("/", (req,res) => servicesController.getOrders(req,res));

module.exports = router;