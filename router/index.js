const express = require('express');
const router = express.Router();
console.log('Router file readen');

router.use('/order',require('./order'));
router.use('/service',require('./service'));

module.exports = router;