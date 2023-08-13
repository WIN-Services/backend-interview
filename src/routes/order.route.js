const express = require('express');
const router = express.Router();
const { orderValidation } = require('../validations/index');
const { orderController } = require('../controllers/index');
const validate = require('../middlewares/validate');


router.get(
    '/', 
    orderController.getAllOrders
);

router.get(
    '/:orderId',  
    validate(orderValidation.getOrderById), 
    orderController.getOrderById
);

router.post(
    '/', 
    validate(orderValidation.createOrder), 
    orderController.createOrder
);

router.patch(
    '/:orderId', 
    validate(orderValidation.updateOrder), 
    orderController.updateOrder
);

router.delete(
    '/:orderId',
    validate(orderValidation.deleteOrder), 
    orderController.deleteOrder
);


module.exports = router;
