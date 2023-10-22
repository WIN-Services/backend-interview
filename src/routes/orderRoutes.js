const express = require('express');
const {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
} = require('../controllers/orderController');

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders/:id', getOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);
router.get('/orders', getAllOrders);

module.exports = router;
