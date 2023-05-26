const router = require('express').Router()
const {createOrder, findOrder, findAllOrders,updateOrder, deleteOrder}  = require('./../controllers/orderControllers');

router.route('/orders').get(findAllOrders).post(createOrder)
router.route('/orders/:id').get(findOrder).delete(deleteOrder).put(updateOrder);

module.exports = router

