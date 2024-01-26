const { Op } = require("sequelize");
const moment = require("moment");

const Models = require("../models/index.js");
const APP_CONSTANTS = require("../constants.js");
const Order = Models.Order;
const Service = Models.Service;
const { sequelize } = Models;

const ORDER_ERRORS = APP_CONSTANTS.ORDER.ERRORS;

// Function to check for orders within 3 hours for same service
async function isorderWithinThreeHours(datetime, serviceId) {
  const threehoursBefore = new Date(datetime);
  threehoursBefore.setHours(threehoursBefore.getHours() - 3);

  const threehoursAfter = new Date(datetime);
  threehoursAfter.setHours(threehoursAfter.getHours() + 3);

  const orders = await Order.findAll({
    where: {
      datetime: {
        [Op.between]: [threehoursBefore, threehoursAfter],
      },
      serviceId,
    },
  });

  return { exist: orders.length > 0, orders };
}

const create = async (req, res) => {
  // Validations
  const { totalFee, serviceId } = req.body;

  const service = await Service.findOne({ where: { id: serviceId } });
  if (!service) {
    return res.status(400).send({
      status: APP_CONSTANTS.STATUS.FAILURE,
      message: ORDER_ERRORS.INVALID_SERVICE,
    });
  }

  if ((await isorderWithinThreeHours(new Date(), serviceId)).exist) {
    return res.status(400).send({
      status: APP_CONSTANTS.STATUS.FAILURE,
      message: ORDER_ERRORS.ALREADY_EXISTS,
    });
  }
  return Order.create({
    totalFee,
    serviceId,
  })
    .then((order) => {
      res.status(201).send({
        status: APP_CONSTANTS.STATUS.SUCCESS,
        order,
      });
    })
    .catch((error) =>
      res.status(500).send({
        status: APP_CONSTANTS.STATUS.FAILURE,
        message: APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG,
      })
    );
};

const getAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [Service],
    });
    res.status(200).json({
      status: APP_CONSTANTS.STATUS.SUCCESS,
      orders,
    });
  } catch (err) {
    res.status(500).send({
      status: APP_CONSTANTS.STATUS.FAILURE,
      message: ORDER_ERRORS.GET,
    });
  }
};

const getById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [Service],
    });
    if (!order) {
      return res.status(404).send({
        message: APP_CONSTANTS.ERRORS.NOT_FOUND,
        status: APP_CONSTANTS.STATUS.SUCCESS,
      });
    }
    res.status(200).json({
      status: APP_CONSTANTS.STATUS.SUCCESS,
      order,
    });
  } catch (err) {
    res.status(500).send({
      status: APP_CONSTANTS.STATUS.FAILURE,
      message: ORDER_ERRORS.GET,
    });
  }
};
const update = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).send({
        message: APP_CONSTANTS.ERRORS.NOT_FOUND,
        status: APP_CONSTANTS.STATUS.FAILURE,
      });
    }

    const checkExistingOrder = await isorderWithinThreeHours(new Date());
    if (checkExistingOrder.exist) {
      const sameOrder = checkExistingOrder.orders.reduce((total, current) => {
        if (current.id === orderId) {
          return total + 1;
        }
      }, 0);
      if (!sameOrder) {
        return res.status(400).send({
          status: APP_CONSTANTS.STATUS.FAILURE,
          message: ORDER_ERRORS.ALREADY_EXISTS,
        });
      }
    }

    const { serviceId, totalFee } = req.body;
    await order.update({ totalFee, serviceId });
    res.status(200).send({
      status: APP_CONSTANTS.STATUS.SUCCESS
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: APP_CONSTANTS.STATUS.FAILURE,
      message: APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const orderDetails = await Order.findByPk(req.params.id);
    if (!orderDetails) {
      return res.status(404).json({
        message: APP_CONSTANTS.ERRORS.NOT_FOUND,
        status: APP_CONSTANTS.STATUS.FAILURE,
      });
    } else {
      await orderDetails.destroy();
      return res.status(200).json({
        status: APP_CONSTANTS.STATUS.SUCCESS,
      });
    }
  } catch (error) {
    console.error("Error inserting task:", error);
    return res.status(500).json({
      status: APP_CONSTANTS.STATUS.FAILURE,
      message: APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
