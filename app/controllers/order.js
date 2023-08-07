const model = require("../models/order");
const smodel = require("../models/servicerecord");
const { matchedData } = require("express-validator");
const utils = require("../utils");
const db = require("../utils/db");

/*********************
 * Private functions *
 *********************/

/**
 * Gets all items from database
 */
const getAllItemsFromDB = async () => {
  return new Promise((resolve, reject) => {
    model.find(
      {},
      "-updatedAt -createdAt",
      {
        sort: {
          CreatedAt: -1,
        },
      },
      (err, items) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message));
        }
        resolve(items);
      }
    );
  });
};

/********************
 * Public functions *
 ********************/

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getAllItems = async (req, res) => {
  try {
    res.status(200).json(await getAllItemsFromDB());
  } catch (error) {
    utils.handleError(res, error);
  }
};

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
  try {
    // const query = await db.checkQueryString(req.query)
    res
      .status(200)
      .json(
        await db.getItemsMultiCollection(req, model, req.query, [
          "services",
        ])
      );
  } catch (error) {
    utils.handleError(res, error);
  }
};

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
  try {
    req = matchedData(req);
    res.status(200).json(await db.getItem(req, model, {id: req.id}));
  } catch (error) {
    utils.handleError(res, error);
  }
};

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateItem = async (req, res) => {
  try {
    let id = req.params.id;
    req = req.body
    if(req.services) {
      let ids = []
      req.services.forEach(service => {
        if(ids.indexOf(service.id) < 0) {
          ids.push(service.id)
        }
      })
      let srecords  = await db.getItems(req, smodel, {id: {$in: ids} })
      if(srecords.length === ids.length) {
        res.status(200).json(await db.updateItem(id, model, req));
      } else {
        res.status(200).json({
          code: 422,
          message: "Invalid Service"
        });    
      }
    } else {
      res.status(200).json(await db.updateItem(id, model, req));
    }
  } catch (error) {
    utils.handleError(res, error);
  }
};

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createItem = async (req, res) => {
  try {
    req = req.body;
    if(req.services) {
      let ids = []
      req.services.forEach(service => {
        if(ids.indexOf(service.id) < 0) {
          ids.push(service.id)
        }
      })
      let srecords  = await db.getItems(req, smodel, {id: {$in: ids} })
      if(srecords.length === ids.length) {
        res.status(201).json(await db.createItem(req, model));    
      } else {
        res.status(200).json({
          code: 422,
          message: "Invalid Service"
        });    
      }
    }
  } catch (error) {
    utils.handleError(res, error);
  }
};

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    res.status(200).json(await db.deleteItem(req.id, model));
  } catch (error) {
    utils.handleError(res, error);
  }
};
