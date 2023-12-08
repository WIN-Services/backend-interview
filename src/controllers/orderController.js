const Order = require('../models/Order')
const ServiceRecord = require('../models/ServiceRecord') 


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('services') 
    res.json(orders) 
  } catch (error) {
    console.error('Error fetching orders:', error) 
    res.status(500).json({ error: 'Internal Server Error' }) 
  }
} 

exports.getOrderById = async (req, res) => {
  const orderId = req.params.id 
  try {
    const order = await Order.findById(orderId).populate('services') 
    if (order) {
      res.json(order) 
    } else {
      res.status(404).json({ error: 'Order not found' }) 
    }
  } catch (error) {
    console.error(`Error fetching order with ID ${orderId}:`, error) 
    res.status(500).json({ error: 'Internal Server Error' }) 
  }
} 

exports.createOrder = async (req, res) => {
  const { services, totalfee } = req.body 
  try {
    const existingOrder = await Order.findOne({
      'services': { $in: services },
      datetime: { $gte: new Date(Date.now() - 3 * 60 * 60 * 1000) },
    }) 

    if (existingOrder) {
      return res.status(409).json({ error: 'Conflict - Cannot create a new order for the same service within 3 hours' }) 
    }

    const order = await Order.create({ services, totalfee }) 
    res.status(201).json(order) 
  } catch (error) {
    console.error('Error creating order:', error) 
    res.status(500).json({ error: 'Internal Server Error' }) 
  }
} 

exports.updateOrder = async (req, res) => {
  const orderId = req.params.id 
  const { services, totalfee } = req.body 
  try {
    const existingOrder = await Order.findOne({
      _id: { $ne: orderId },
      'services': { $in: services },
      datetime: { $gte: new Date(Date.now() - 3 * 60 * 60 * 1000) },
    }) 

    if (existingOrder) {
      return res.status(409).json({ error: 'Conflict - Cannot update an order for the same service within 3 hours' }) 
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { services, totalfee }, { new: true }).populate('services') 
    if (updatedOrder) {
      res.json(updatedOrder) 
    } else {
      res.status(404).json({ error: 'Order not found' }) 
    }
  } catch (error) {
    console.error(`Error updating order with ID ${orderId}:`, error) 
    res.status(500).json({ error: 'Internal Server Error' }) 
  }
} 

exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id 
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId) 
    if (deletedOrder) {
      res.sendStatus(204) 
    } else {
      res.status(404).json({ error: 'Order not found' }) 
    }
  } catch (error) {
    console.error(`Error deleting order with ID ${orderId}:`, error) 
    res.status(500).json({ error: 'Internal Server Error' }) 
  }
} 

