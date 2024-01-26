const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();

const serviceRoutes = require('./service.routes.js');
const orderRoutes = require('./order.routes.js');

router.get('/', (req, res) => {
  res.send('Hello World!' + process.env.NODE_ENV)
});

router.use('/v1/services', serviceRoutes);
router.use('/v1/orders', orderRoutes);

module.exports = router;
