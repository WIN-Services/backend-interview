const errorMessageConstants = require("../constants/error.messages");
const db = require("../models");
const order_model = db.order_model;
const createResponse = require("../utils/response");
const { Op, QueryTypes } = require("sequelize");
const service_model = db.service_model;

/**
 * Create an order.
 * @param {Object} orderToSave - The order data to be saved.
 * @returns {Promise} A promise that resolves to the created order data.
 */
module.exports.createOrder = function (orderToSave) {
  return new Promise((resolve, reject) => {
    order_model
      .create(orderToSave)
      .then((data) => {
        resolve(createResponse.success(data.dataValues));
      })
      .catch((err) => {
        console.log(err.message);
        response = {
          errorCode: errorMessageConstants.INTERNAL_SERVER_ERROR_CODE,
          errorMessage: errorMessageConstants.UNABLE_TO_SAVE_MESSAGE,
        };
        reject(createResponse.error(response));
      });
  });
};

/**
 * Get order details by ID.
 * @param {string} id - The ID of the order.
 * @returns {Promise} A promise that resolves to the order details.
 */
module.exports.getOrderDetailsById = function (id) {
  return new Promise((resolve, reject) => {
    order_model
      .findOne({
        where: { id: id },
        include: [
          {
            model: service_model,
            as: "services",
          },
        ],
      })
      .then(async (data) => {
        resolve(data.dataValues);
      })
      .catch((err) => {
        console.log(err);
        reject(err.message);
      });
  });
};

/**
 * Get all order details.
 * @returns {Promise} A promise that resolves to the order details.
 */
module.exports.getAllOrderDetails = function () {
  return new Promise((resolve, reject) => {
    order_model
      .findAll({
        include: [
          {
            model: service_model,
            as: "services",
          },
        ],
      })
      .then(async (data) => {
        resolve(data.map((order) => order.dataValues));
      })
      .catch((err) => {
        console.log(err);
        reject(err.message);
      });
  });
};

/**
 * Delete an order.
 * @param {string} order_id - The ID of the order to delete.
 * @returns {Promise} A promise that resolves to the number of affected rows.
 */
module.exports.deleteOrders = function (order_id) {
  return new Promise((resolve, reject) => {
    order_model
      .update(
        { is_deleted: true },
        {
          where: { id: order_id, is_deleted: false },
        }
      )
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

/**
 * Update an order.
 * @param {Object} orderToSave - The order data to be updated.
 * @returns {Promise} A promise that resolves to the number of affected rows.
 */
module.exports.updateOrders = function (orderToSave) {
  return new Promise((resolve, reject) => {
    order_model
      .update(orderToSave, {
        where: { id: orderToSave.id, is_deleted: false },
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err.message);
        reject(err.message);
      });
  });
};

/**
 * Get a pre-existing order within the specified timeframe.
 * @returns {Promise} A promise that resolves to the pre-existing order, if found.
 */
module.exports.getOrderByDateTime = function () {
  // Check if there is a pre-existing order within the specified timeframe
  const now = new Date();
  const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  return new Promise((resolve, reject) => {
    order_model
      .findOne({ where: { created_at: { [Op.gte]: threeHoursAgo } } })
      .then(async (data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err.message);
      });
  });
};
