const router = require('express').Router();

router.use('/service', require('./service'));
router.use('/order', require('./order'));

module.exports = router;