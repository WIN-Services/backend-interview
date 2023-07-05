const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');
const { ObjectId } = require("mongoose");

// Create a order
router.post("/",async (req,res)=>{
    try{    
        console.log(req.body)
        const { services, userId } = req.body
        let totalAmount = await calcAmount(services);
        console.log(totalAmount)
        const order = new Order({
            "services": services,
            "userId": userId,
            "amount": totalAmount,
        })
        order.save()
        console.log("HI",order)
        res.json(order)
    }catch(err){
        console.log("any other error while placing order");
        res.status(500).json({message: err});
    }
});

function calcAmount(services){
    let total = 0
    for (let i=0;i<services.length;i++){
        total += services[i].amount * services[i].quantity
    }
    return total;
}

//All orders
router.get("/", async (req,res)=>{
    try{
        let orders = await Order.find()
        if(!orders.length){
            orders = 'No Orders'
        }
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json({message:err});
    }
})

// Get specific order
router.get("/:id", async (req,res)=>{
    console.log('get specific called',req.params.id)
    try{
        const orders = await Order.findById({_id:req.params.id})
        if(!orders){
            res.status(404).json("Order Not Found")
        }
        else{
            res.status(200).json(orders);
        }
    }catch(err){
        console.log("get specific order error:", err)
        res.status(500).json({message:err});
    }
})


// Update specific order
router.put("/:id", async (req,res)=>{
    try{
        let totalAmount = await calcAmount(req.body.services);
        const orders = await Order.findByIdAndUpdate({_id:req.params.id},{...req.body,amount:totalAmount})
        res.status(200).json("Order updated");
    }catch(err){
        console.log("update order error:",err)
        res.status(500).json({message:err});
    }
})

//Delete specific order
router.delete('/:id',async (req,res)=>{
    try{
        const orders = await Order.findByIdAndDelete({_id:req.params.id})
        res.status(200).json("Order Deleted");
    }catch(err){
        console.log("delete order error:", err)
        res.status(500).json({message:err});
    }
});

// Get all orders of any user
router.get("/userId", async (req,res)=>{
    console.log(req.params)
    try{
        const orders = await Order.findAll({userId:req.params.userId._id})
        if(!orders.length){
            orders = "No Orders"
        }
        res.status(200).json(orders);
    }catch(err){
        console.log("get specific user order error:", err)
        res.status(500).json({message:err});
    }
})
module.exports = router;