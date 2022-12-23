var express = require('express');
var router = express.Router();
const User = require('../models/User')
const Service = require('../models/Service')
const Order = require('../models/Order');
const auth = require('../middleware/auth');
//Route for admin users to get all orders from all users
router.get("/all", auth,async (req,res)=>{
    const user = User.findById(req.cookies.user_id)
    if(user.email===process.env.AdminEmail){
        const allOrders = await Order.find().populate()
        res.json({allOrders})
    }else{
        res.json({msg:"You are not an admin"})
    }
})
//Route for user to see their orders
router.get("/userOrders", auth, async (req,res)=>{
    //Show all orders for a particular user
    const user = await User.findById(req.cookies.user_id)
    .populate({
        path:"orders",
        model:"Order"
    })
    res.json({"user_email": user.email, "order":user.orders})
})
const getServiceInfo = async (idx)=>{
    const service = await Service.findOne({index: idx})
    return service
}
//Route to make order
router.post("/currentorder", auth,async (req,res)=>{ 
    //Takes the index values of services in an array
    const {serviceIndices} = req.body
    console.log("hello", req.body)
    let sum = 0;
    let services = []
    for(i of serviceIndices) {
        const service = await getServiceInfo(i)
        console.log("cost", service.name)
        services.push(service)
        sum+=service.cost
    }
    const user = await User.findById(req.cookies.user_id)
    let order = new Order({
        services: services,
        total: sum,
        orderedBy: user
    })
    user.orders.push(order)
    order.save()
    user.save()
    res.json({
        order
    })
})
//Route to delete one service at one time
router.post("/update/:id",auth,async (req,res)=>{
    const id = req.params.id
    const serviceToRemove = req.body.serviceToRemove
    const order = await Order.findById(id)
    .populate({
        path:"services",
        model:"Service"
    })
    order.services = order.services.filter(el=>{
        if(el.index===serviceToRemove){
            order.total=order.total-el.cost
        }
        if(el.index!==serviceToRemove){
            return el
        }
    })
    order.save()
    console.log("order updated", order)
    res.send(order)
})
//Route to delete an order
router.delete("/delete/:id", auth, async(req,res)=>{
    const user = await User.findById(req.cookies.user_id)
    const order = await Order.findById(req.params.id)
    if(order.orderedBy===user){
        await Order.findByIdAndDelete(req.params.id)
    }else{
        res.json({msg:"You are not allowed to delete this"})
    }
    res.json({msg:"Deleted order"})
})
  module.exports = router;