const order = require("./../model/ordermodel");

exports.getAllorders = async (req, res) => {
  //Get all orders from the database
  try {
    const orders = await order.find();
    res.status(200).json({
      status: "Success",
      data: {
        orders,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getSingleOrder = async (req, res) => {
  //Get particular order from the database
  try {
    const singleOrder = await order.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "Success",
      data: {
        singleOrder,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.createOrder = async (req, res) => {
  // Create a new order
  try {
    const newOrder = await order.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        order: newOrder,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.updateOrder = async (req, res) => {
  // Update an existing order
  try {
    //Calculate time left
    const singleOrder = await order.findOne({ _id: req.params.id });
    const time = singleOrder.UpdatedAt.getHours();
    const timeleft = time - new Date().getHours();

    //add updatedAt in DB
    const data = req.body;
    data.UpdatedAt = new Date();

    //check if time is valid to update Order or Not
    const query = { _id: req.params.id };
    const update = { $set: data };
    if (timeleft <= 3) {
      await order.updateOne(query, update);
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Time exceed",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await order.findByIdAndDelete(req.params.id);
    res.status(204).json({});
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
