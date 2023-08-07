const model = require("../models/servicerecord");
const omodel = require("../models/order");
const { matchedData } = require("express-validator");
const utils = require("../utils");
const db = require("../utils/db");

/*********************
 * Private functions *
 *********************/

/**
 * Checks if a Servicerecord already exists excluding itself
 * @param {string} id - id of item
 * @param {string} name - name of item
 */
const servicerecordExistsExcludingItself = async (name) => {
  try {
    let item = await model.findOne({
      name: {
        $ne: name,
      },
    });
    return item;
  } catch (err) {
    return utils.itemAlreadyExists(err, null, reject, "RECORD_ALREADY_EXISTS");
  }
};

/**
 * Checks if a servicerecord already exists in database
 * @param {string} name - name of item
 * @param farmer_id
 * @param plot_id
 */
const servicerecordExists = async (name) => {
  try {
    let item = await model.findOne({
      name,
    });
    return item;
  } catch (err) {
    throw new Error("Record already exists")
  }
};

// /**
//  * Gets all items from database
//  */
// const getAllItemsFromDB = async () => {
//   return new Promise((resolve, reject) => {
//     model.find(
//       {},
//       "-updatedAt -createdAt",
//       {
//         sort: {
//           CreatedAt: -1,
//         },
//       },
//       (err, items) => {
//         if (err) {
//           reject(utils.buildErrObject(422, err.message));
//         }
//         resolve(items);
//       }
//     );
//   });
// };

/********************
 * Public functions *
 ********************/

// /**
//  * Get all items function called by route
//  * @param {Object} req - request object
//  * @param {Object} res - response object
//  */
// exports.getAllItems = async (req, res) => {
//   try {
//     res.status(200).json(await getAllItemsFromDB());
//   } catch (error) {
//     utils.handleError(res, error);
//   }
// };

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
  try {
    res.status(200).json(await db.getItems(req, model, req.query));
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
    req = req.body;
    const doesServicerecordExists = await servicerecordExists(
      req.name
    );
    if (!doesServicerecordExists) {
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
    const doesServicerecordExists = await servicerecordExists(req.name);
    if (!doesServicerecordExists) {
      res.status(201).json(await db.createItem(req, model));
    } else {
      res.status(200).json({code: 422, message: "Record already exist"})
    }
  } catch (error) {
    return utils.handleError(res, error);
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
    let orders = await db.getItems(req, omodel, {"services.id": req.id})
    if(orders.length) {
      return utils.handleError(res, {code: 422, message: "Cannot delete the service as one of the orders has this service"});
    } else {
      res.status(200).json(await db.deleteItem(req.id, model));
    }
  } catch (error) {
    utils.handleError(res, error);
  }
};
