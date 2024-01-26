const APP_CONSTANTS = require("../constants.js");
const SERVICE_CONSTANTS = APP_CONSTANTS.SERVICE;

const Models = require("../models/index.js");
const Service = Models.Service;

const validateService = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: SERVICE_CONSTANTS.ERRORS.REQUIRED_PARAM_MISSING });
  }
  next();
};

const validateIfExist = async (req, res, next) => {
  const { name } = req.body;

  const service = await Service.findOne({ where: { name } });

  if (service) {
    return res.status(400).json({ message: SERVICE_CONSTANTS.ERRORS.ALREADY_EXISTS });
  }
  next();
};

module.exports = {
  validateService,
  validateIfExist,
};
