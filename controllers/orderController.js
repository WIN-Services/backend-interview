const Order = require('../models/order'); 
const { validationResult } = require('express-validator');

exports.createOrder = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

  try {
    const requestData = req.body;
    const threeHoursAgo = new Date(Date.now() - 3 * 1000);
    const existingOrder = await Order.findOne({
      datetime: {
        $gte: threeHoursAgo,
      },
    });

    if (existingOrder) {
      return res.status(400).json({ error: 'Please place order after 3 hour' });
    }
    const order = new Order({
      datetime: new Date(), 
      totalfee: requestData.totalfee,
      services: requestData.services, 
    });

    
    await order.save();
    res.status(201).json({order:order , message :'Order created successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
  }
};


exports.updateOrder = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const id = req.params.id; 
      const updatedData = req.body; 

      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);

    const existingOrderWithinThreeHours = await Order.findOne({
      datetime: {
        $gte: threeHoursAgo,
      },
    });

    if (existingOrderWithinThreeHours) {
      return res.status(400).json({ error: 'Please place order after 3 hour.' });
    }
  
      const existingOrder = await Order.findById(id);
      console.log(existingOrder);
  
      if (!existingOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      Object.assign(existingOrder, updatedData);
      await existingOrder.save();
  
      res.json(existingOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

exports.deleteOrder = async (req, res) => {
    try {
      const id = req.params.id; 
      const existingOrder = await Order.findById(id);
  
      if (!existingOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
     
      await existingOrder.deleteOne({_id:existingOrder._id});
  
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
