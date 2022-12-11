const express = require('express');
const orderController = require('./../controllers/orderController');

const router = express.Router();



router
  .route('/')
  .post(orderController.createOrder)
  .get(orderController.getAllOrder);

  router
  .route('/:id')
  .get(orderController.getOrder)
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder);


  module.exports = router;