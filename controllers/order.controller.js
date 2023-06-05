const errorMessageConstants = require("../constants/error.messages");

const orderDao = require("../dao/order.dao");

const createResponse = require("../utils/response");

const globalConstants = require("../constants/global-constants");

exports.createOrder = async (req, res) => {
  if (!req.body.totalfee) {
    res.status(400).json({
      status: globalConstants.VALIDATION_FAILED,
      message: "Order total fee cannot be empty.",
    });
    return;
  }

  if (!req.body.service_id) {
    res.status(400).json({
      status: globalConstants.VALIDATION_FAILED,
      message: "Service Id cannot be empty.",
    });
    return;
  }

  try {
    let orderToSave = {
      totalfee: req.body.totalfee,
      service_id: req.body.service_id,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const existingOrder = await orderDao.getOrderByDateTime();
    if (existingOrder) {
      const errorMessage =
        "Cannot create/update order within 3 hours of a pre-existing order.";
      res.status(400).json({
        status: globalConstants.VALIDATION_FAILED,
        message: errorMessage,
      });
      return;
    }
    orderDao
      .createOrder(orderToSave)
      .then((data) => {
        res.status(200).json({
          status: globalConstants.SUCCESS,
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          status: globalConstants.FAILED,
          error: {
            message: "Internal server error.",
          },
        });
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: globalConstants.FAILED,
      error: {
        message: "Internal server error.",
      },
    });
  }
};

exports.getOrderById = async (req, res) => {
  if (!req.params.order_id) {
    res.status(400).json({
      status: globalConstants.VALIDATION_FAILED,
      message: `order_id ${errorMessageConstants.REQUIRED_ID}`,
    });
    return;
  }

  try {
    const data = await orderDao.getOrderDetailsById(req.params.order_id);
    if (data !== null) {
      res.status(200).json({
        status: globalConstants.SUCCESS,
        data: data,
      });
    } else {
      res.status(404).json({
        status: globalConstants.VALIDATION_FAILED,
        error: {
          errorCode: errorMessageConstants.DATA_NOT_FOUND_ERROR_CODE,
          errorMessage: errorMessageConstants.DATA_NOT_FOUND,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: globalConstants.VALIDATION_FAILED,
      error: {
        message: err.message,
      },
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const data = await orderDao.getAllOrderDetails();
    if (data !== null && data.length > 0) {
      res.status(200).json({
        status: globalConstants.SUCCESS,
        data: data,
      });
    } else {
      res.status(404).json({
        status: globalConstants.VALIDATION_FAILED,
        error: {
          errorCode: errorMessageConstants.DATA_NOT_FOUND_ERROR_CODE,
          errorMessage: errorMessageConstants.DATA_NOT_FOUND,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: globalConstants.VALIDATION_FAILED,
      error: {
        message: err.message,
      },
    });
  }
};

exports.deleteOrders = async (req, res) => {
  if (!req.params.order_id) {
    res.status(400).json({
      status:  globalConstants.VALIDATION_FAILED,
      message: errorMessageConstants.REQUIRED_ID,
    });
    return;
  }
  try {
    orderDao
      .deleteOrders(req.params.order_id)
      .then((data) => {
        if (data !== null && data[0] == 1) {
          res.status(200).json({
            status: globalConstants.SUCCESS,
            message: errorMessageConstants.DELETE_DONE_MESSAGE,
          });
        } else {
          res.status(404).json({
            status: globalConstants.VALIDATION_FAILED,
            error: {
              errorCode: errorMessageConstants.DATA_NOT_FOUND_ERROR_CODE,
              errorMessage: errorMessageConstants.UNABLE_TO_DELETE_MESSAGE,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          status: globalConstants.VALIDATION_FAILED,
          error: {
            message: err,
          },
        });
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: globalConstants.VALIDATION_FAILED,
      error: {
        message: e,
      },
    });
  }
};

exports.updateOrders = async (req, res) => {
  if (!req.body.id) {
    res.status(400).json({
      status:  globalConstants.VALIDATION_FAILED,
      message: errorMessageConstants.REQUIRED_ID,
    });
    return;
  }
  try {
    let orderToUpdate = {
      id: req.body.id,
      updated_at: new Date(),
    };

    if (req.body.totalfee) {
      orderToUpdate.totalfee = req.body.totalfee;
    }

    if (req.body.service_id) {
      orderToUpdate.service_id = req.body.service_id;
    }

    const existingOrder = await orderDao.getOrderByDateTime();
    if (existingOrder) {
      const errorMessage =
        "Cannot create/update order within 3 hours of a pre-existing order.";
      res.status(400).json({
        status: globalConstants.VALIDATION_FAILED,
        message: errorMessage,
      });
      return;
    }
    orderDao
      .updateOrders(orderToUpdate)
      .then((data) => {
        if (data !== null && data[0] == 1) {
          res.status(200).json({
            status: globalConstants.SUCCESS,
            message: errorMessageConstants.UPDATE_DONE_MESSAGE,
          });
        } else {
          res.status(404).json({
            status: globalConstants.VALIDATION_FAILED,
            error: {
              errorCode: errorMessageConstants.DATA_NOT_FOUND_ERROR_COde,
              errorMessage: errorMessageConstants.UNABLE_TO_UPDATE_MESSAGE,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          status: globalConstants.VALIDATION_FAILED,
          error: {
            message: err,
          },
        });
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: globalConstants.VALIDATION_FAILED,
      error: {
        message: e,
      },
    });
  }
};
