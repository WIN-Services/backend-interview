const {
  getAllOrderService,
  getOneOrderService,
} = require("../services/orderServices");
const { HttpStatusCode } = require("../enums/httpStatus");

const getAllOrders = async (req, res, next) => {
  try {
    const response = await getAllOrderService();
    res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: "All Orders Fetched Successfully",
      data: response,
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:
        "Error in getting priority user updates. Please try again later!`",
    });
  }
};
const getOneOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const response = await getOneOrderService(orderId);
    res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message:
        "Error in getting priority user updates. Please try again later!`",
      data: response,
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:
        "Error in getting priority user updates. Please try again later!`",
    });
  }
};
module.exports = {
  getAllOrders,
  getOneOrder,
};
