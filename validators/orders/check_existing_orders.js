const Order = require("../../models/order");

//Checks past three hours pre-existing orders for the service
const getServiceOrdersBeforeThreeHours = async (req, res, next) => {
  try {
     await Order.find({
      $and: [
        {
          createdAt: { $gt: new Date(Date.now() - 3 * 60 * 60 * 1000) },
        },
        {
          services: { $in: req.body.services },
        },
      ],
    });
    next()
  } catch (error) {
    console.log(error);
    return res.status(405).json({
        error:
          "Cannot create order as there is an existing order in place within last three hours",
      });
  }
};

module.exports = { getServiceOrdersBeforeThreeHours };