const express = require('express')

const router = express.Router();

const userRoutes = require('./user')
const orderRoutes = require('./order')
const authRoutes = require('./auth')

userRoutes(router);
orderRoutes(router);
authRoutes(router);

module.exports = router