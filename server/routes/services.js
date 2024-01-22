const express = require('express');
const ServiceController = require('../controller/service.controller');
const router = express.Router();
const serviceController = new ServiceController();

router.route('/create').post(serviceController.createService());
router.route('/').get(serviceController.getallService());
module.exports = router;