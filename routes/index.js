const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.get('/test', (req, res) => {
  res.json({ message: 'API TEST' });
});

router.get('/getOrder/:id',orderController.getOrder)
router.get('/getAllOrders', orderController.getAllOrders);
router.post('/createOrder', orderController.createOrder);
router.put('/updateOrder/:id', orderController.updateOrder);
router.delete('/deleteOrder/:id', orderController.deleteOrder);


module.exports = router;