const router = require('express').Router();

// panel routes
router.use('/panel', require('./panel'));

module.exports = router;
