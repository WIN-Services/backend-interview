const express = require('express'),
    router = express.Router();

const services = require('./service');
const orders = require('./order');

router.use('/api/v1', services);
router.use('/api/v1', orders);

module.exports = router;