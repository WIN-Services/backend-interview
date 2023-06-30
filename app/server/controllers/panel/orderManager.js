const { OrderManager } = require("../../services/orderManagementService");

async function creatingOrder(req, res, next) {
  console.log("create");
  try {
    let { amount, services, user } = req.body
    if(!amount || !services || services .length ==0 || !user || typeof amount!='number' ||typeof user!=number )
    return res.status(402).json({msg   :'please provide valid amount and services and user id'})
    const orderManager = new OrderManager();
    const { status, data } = await orderManager.createOrder({
      amount,
      services,
      user,
    });
    console.log("pppppppp", { status, data });
    return res.status(status).json(data);
  } catch (e) {
    return res.status(500).json({
      status: 500,
      type: "SERVER",
      message: `exception occured while scheduling job ${e}`,
      debug_message: "error while schedule job",
    });
  }
}

async function deleteOrder(req, res, next) {
  try {
    const orderManager = new OrderManager();
    const { status, data } = await orderManager.deleteOrder(req);
    return res.status(status).send(data);
  } catch (err) {
    return res.status(500).json({
      type: "SERVER",
      status: 500,
      debug_message: `exception occured while deleting job ${err}`,
      message: "error while deleting job",
    });
  }
}

async function updateOrder(req, res, next) {
  try {
    if(!amount || !services || services .length ==0 || !user || typeof amount!='number' ||typeof user!=number )
    return res.status(402).json({msg   :'please provide valid amount and services and user id'})
    const orderManager = new OrderManager();
    const { status, data } = await orderManager.updateOrder(
      req.body,
      req.params.id
    );
    return res.status(status).send(data);
  } catch (err) {
    return res.status(500).json({
      type: "SERVER",
      status: 500,
      message: "error while deleting job",
    });
  }
}

async function getOrders(req, res, next) {
  try {
    const orderManager = new OrderManager();
    const { status, data } = await orderManager.getOrderDetailsOfUser(req);
    return res.status(status).send(data);
  } catch (err) {
    return Error
  }
}

module.exports = {
  creatingOrder,
  deleteOrder,
  updateOrder,
  getOrders,
};
