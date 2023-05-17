const { Services, Orders } = require("../models");

const getAllOrderService = async () => {
  try {
    let orders = await Orders.findAll();
    return orders;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllOrderService,
};
