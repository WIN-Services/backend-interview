const express = require('express');
const {
    getAllOrders,
    getOrderById
} = require('../controllers/orders');
const { paramIdValidator } = require('../middleware');

const router = express.Router();


router.get('/', getAllOrders);
router.get('/order/:id',paramIdValidator, getOrderById);

module.exports = router;