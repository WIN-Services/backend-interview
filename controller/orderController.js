const { ObjectId } = require('mongodb');
const Order= require('../models/orderModel');
const Service = require('../models/serviceModel');
const { errorResponse, successResponse, successResponseMsg } = require('../errorHandlers');
const { responseMessage } = require('../constants');

const orderController = {};


orderController.fetchAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    const newOrders = await Promise.all( orders.map(async (orderItem) =>{
      let newOrderItem = orderItem.populate("services","name");

      return newOrderItem;
    }));

    res.status(200).json(successResponse(newOrders))
  } catch (error) {
    res.status(500).json(errorResponse(responseMessage.SERVER));
  }
};

orderController.createOrder = async (req, res) => {
  try {
    const newOrder = req.body;
    const serviceIds = Promise.all(newOrder.services.map(async (orderItem) =>{
      let newOrderItem = Service.findOne({id: orderItem.id})

      return newOrderItem;
  }))
  const orderItemsIdsResolved =  await serviceIds;
  newOrder.services = orderItemsIdsResolved;
    newOrder.datetime = new Date();
    const existingOrder = await Order.findOne({ id: newOrder.id });

    if (existingOrder) {
        return res.status(400).json(errorResponse(responseMessage.RECORD_EXIST));
    }
    console.log(newOrder)
    const order = new Order(newOrder);
    await order.save();
    res.status(201).json(successResponse(order));
  } catch (error) {
    console.log(error);
    res.status(500).json(errorResponse(responseMessage.SERVER));
  }
};

orderController.getOrderById = async (req, res) => {
  try {
    const orderDetails = await Order.findById(req.params.orderId).populate(
      "services",
      "name"
    );
    if(!orderDetails) {
      return res.status(400).json({body: errorResponse(responseMessage.NO_RECORDS)})
    }
    console.log(orderDetails);
    res.status(200).json({body: successResponse(orderDetails)});
  } catch (error) {
    res.status(500).json({body: errorResponse(responseMessage.SERVER)});
  }
};

orderController.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrder = req.body;
    console.log(updatedOrder);
    const currentTime = new Date();
    const threeHoursAgo = new Date(currentTime.getTime() - 3 * 60 * 60 * 1000);
    const existingOrder = await Order.findOne({ id: newOrder.id });

    if (existingOrder) {
      const currentTime = new Date();
      const threeHoursAgo = new Date(currentTime.getTime() - 3 * 60 * 60 * 1000);

      if (existingOrder.datetime > threeHoursAgo) {
        return res.status(400).json(errorResponse(responseMessage.UPDATE_RECORD_WAIT));
      }
    }

    await Order.findOneAndUpdate({ id: orderId }, updatedOrder);
    res.status(200).json(successResponseMsg(responseMessage.UPDATE_SUCCESS));
  } catch (error) {
    res.status(500).json({body: errorResponse(responseMessage.SERVER)});
  }
};

orderController.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await Order.findOneAndDelete({ id: orderId });
    res.status(200).json(successResponseMsg(responseMessage.DELETE_RECORD));
  } catch (error) {
    res.status(500).json(errorResponse(responseMessage.SERVER));
  }
};


module.exports = orderController;