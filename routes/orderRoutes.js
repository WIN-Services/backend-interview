const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { body, check } = require('express-validator');

const createOrderValidationRules = [
    body('totalfee').not().isEmpty().isFloat({ min: 0 }),
    body('services').not().isEmpty().isArray().withMessage('Services should be an array'),
];

router.get('/orders', orderController.getAllOrders);
router.post('/orders', createOrderValidationRules,orderController.createOrder);

router.put('/orders/:id',createOrderValidationRules, orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder); 

module.exports = router;
