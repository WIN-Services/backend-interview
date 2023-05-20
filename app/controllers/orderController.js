const {
  getAllOrderService,
  getOneOrderService,
  PostOrderService,
} = require("../services/orderServices");
const { HttpStatusCode } = require("../enums/httpStatus");

const getAllOrders = async (req, res) => {
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
      message: "Error in fetching all orders!. Please try again later!",
    });
  }
};
const getOneOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const response = await getOneOrderService(orderId);
    res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: "Order Fetched Successfully!",
      data: response,
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error in fetching order!. Please try again later!`",
    });
  }
};

const postOrders = async (req, res) => {
  try {
    const { services, totalfee } = req.body;
    const response = await PostOrderService(services, totalfee);
    res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: "Order posted Successfully!`",
      data: response,
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error in posting order!. Please try again later!",
    });
  }
};
module.exports = {
  getAllOrders,
  getOneOrder,
  postOrders,
};
