const Order = require('../models/orderModel')
const mongoose = require('mongoose')


//GET all orders
const getOrders = async (req, res) => {
    const orders = await Order.find({}).sort({createdAt: -1})
    res.status(400).json(orders)
}

//GET a single order
const getOrder = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Order Found with this Order ID'})
    }

    const order = await Order.findById(id)

    if(!order) {
        return res.status(404).json({error: 'No Order Found with this Order ID'})
    }
    res.status(200).json(order)
}

//POST a new order
const createOrder = async (req, res) => {

    const {totalfee,services} = req.body

    try{
        const order = await Order.create({totalfee,services})
        res.status(200).json(order)
    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

//DELETE an order
const deleteOrder = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No Order Found with this Order ID'})
    }

    const order = await Order.findOneAndDelete({_id:id})

    if(!order) {
        return res.status(400).json({error:'No such Order Found'})
    }

    res.status(200).json(order)
}

//UPDATE a workout
const updateOrder = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Order Found with this Order ID'})
    }

    const order = await Order.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!order) {
        return res.status(400).json({error:'No such Order Found'})
    }
    res.status(200).json(order)
}


module.exports = {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder
}