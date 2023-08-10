const express = require('express')
const OrderModel = require('../models/orderModel')
const orderModel = new OrderModel();
const router = express.Router()

router.post('/',async (req,res) =>{
    try{
        const orderData = req.body
        const newOrder = await orderModel.createOrder(orderData)

        res.status(200).json(newOrder)
    }catch(error){
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})

router.get('/',async (req,res) => {
    try{
        const allOrders = await orderModel.getAllOrders()
        //console.log('here',allOrders)
        res.status(200).json(allOrders)
    }catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})

router.get('/:id',async (req,res) => {
    try{
        const orderId = req.params.id
        const singleOrder = await orderModel.getOrderById(orderId)
        //console.log('here',allOrders)
        res.status(200).json(singleOrder)
    }catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})

router.put('/:id', async (req,res) => {
    try{

        const orderId = req.params.id

        const updatedData = req.body
       // console.log(req.body)
        const existingOrder = await orderModel.getOrderById(orderId)

        if(!existingOrder){
            res.status(404).json({error:'Order not found'})
            return
        }
        
    //    check if time difference less than 3 hours
        
        const currentTime = new Date()
        const orderTime =new Date(existingOrder[0].datetime)

        const timeDiff= currentTime - orderTime

        const threeHoursInMillis = 3 * 60 * 60 * 1000
        // console.log(currentTime)
        // console.log(orderTime)

        if(timeDiff < threeHoursInMillis){
            res.status(400).json({error:'Order cannot be updated within 3 hours of last order'})
            return
        }
        
        const updatedOrder = await orderModel.updateOrder(orderId,updatedData)
        res.status(200).json(updatedOrder)
    }catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})

router.delete('/:id', async (req,res) =>{
    try{

        const orderId = req.params.id
        await orderModel.deleteOrder(orderId)
        res.status(204).end()
    }catch (error){
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})

module.exports = router