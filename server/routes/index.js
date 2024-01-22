const express = require('express');
const router = express.Router();
const orders = require('./orders');
const services = require('./services');


router.use('/orders', orders);
router.use('/services', services);


module.exports = router;