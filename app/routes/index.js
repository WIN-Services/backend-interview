const router = require('express').Router();

router.use('/order', require('./order'));

module.exports = router;
