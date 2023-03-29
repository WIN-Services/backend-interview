/* This is importing the required modules. */
const express = require('express');
const router=express.Router();
const {createOrder,updateOrder,deleteOrder}=require('../controller/orders.controller')
const {getOrders,getOrderById}=require('../view/orders.view')
const {migrateDB}=require('../utils/db.migration')

router.get('/migrate-db',migrateDB);

router.post('/create-order',createOrder);

router.get('/orders/:order_id',getOrderById);

router.put('/update-order',updateOrder);

router.delete('/orders/:order_id',deleteOrder);

router.get('/orders',getOrders);


/* This is a middleware that is used to handle 404 errors. */
router.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        message: "Oops! URL not found, try something different!" + req.path
    })
});

/* Exporting the router module. */
module.exports=router;