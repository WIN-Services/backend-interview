const express = require('express');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller');

const router = express.Router();

router.get('/orders', getAllOrders);
router.get('/order/:id', getOrderById);
router.post('/order', createOrder);
router.put('/order/:id', updateOrder);
router.delete('/order/:id', deleteOrder);

module.exports = router;
