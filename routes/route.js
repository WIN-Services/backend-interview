const express = require('express');
const Controller = require('../controllers/controller')
const validate = require('../middleware/validate')
require('dotenv').config();
const mongoString = process.env.DATABASE_URL;
const {
  orders
} = require('../model/model')
const router = express()


router.get('/orders',Controller.getAllOrders)
router.get('/order/:id',Controller.getOrderById)
router.delete('/order/:id',Controller.OrderDelete)

router.post('/order/new',validate.timeCheck,Controller.createOrder)
router.put('/order/:id' ,validate.timeCheck , Controller.updateOrder)




module.exports = router;