const Order = require("../models/order");
const Service = require("../models/service");

module.exports = {
  // This API is used to get order list
  getOrderList: async (req, res) => {
    try {
      const orders = await Order.find().populate("services");
      console.log(orders);
      res.json({ data: orders });
    } catch (error) {
      res.status(500).json({
        message: "INternal Server Error",
        error: error.toString(),
      });
    }
  },

  //  This API is used to create Order
  createOrder: async (req, res) => {
    try {
      // get the body data
      let { totalfee, serviceIds } = req.body;

      //   we have to verify that data, due to less time it couldn't be

      // find the Services
      let services = await Service.find({ _id: { $in: serviceIds } });

      const newOrder = await Order.create({
        totalfee,
        services,
      });

      //   send response
      res.status(201).json(newOrder);
    } catch (error) {
      // send error response
      res.status(500).json({
        message: "INternal Server Error",
        error: error.toString(),
      });
    }
  },
};
