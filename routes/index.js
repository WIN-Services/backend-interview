const express =  require('express');
const serviceRoutes = require('./serviceRoutes');
const orderRoutes = require('./orderRoutes');

const router  = express.Router();

router.use('/service', serviceRoutes);
router.use('/order', orderRoutes);

module.exports = router;
