const express = require('express');
const validate = require('../middleware/json-validator/index');
const {
    createOrder,
    updateOrder,
    getAllOrders,
    getOrderById,
    deleteOrder
} = require('../controllers/orders');
const { requestBodyValidator } = require('../middleware/json-validator/validateRequests');
const { paramIdValidator } = require('../middleware');
const router = express.Router();

router.get('/', getAllOrders);
router.get('/order/:id',paramIdValidator, getOrderById);
router.post('/order/new',validate({body: requestBodyValidator}), createOrder); //validate.validateOrderRequest
router.put('/order/:id',paramIdValidator,validate({body: requestBodyValidator}), updateOrder); //validate.validateOrderRequest
router.delete('/order/:id',paramIdValidator, deleteOrder);

module.exports = router;