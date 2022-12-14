const Order = require("../models/OrderModel");

//Checks past three hours pre-existing orders for the service
const getServiceOrdersBeforeThreeHours = async (serviceIds) => {
  try {
    return await Order.find({
      $and: [
        {
          createdAt: { $gt: new Date(Date.now() - 3 * 60 * 60 * 1000) },
        },
        {
          services: { $in: serviceIds },
        },
      ],
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { getServiceOrdersBeforeThreeHours };
