const { Services, Orders } = require("../models");

const getAllOrderService = async () => {
  try {
    let orders = await Orders.find({});
    return orders;
  } catch (err) {
    throw err;
  }
};

const getOneOrderService = async (orderId) => {
  try {
    let foundOrder = await Orders.findById(orderId);
    return foundOrder;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllOrderService,
  getOneOrderService,
};
