const APP_CONSTANTS = require("../constants.js");
const ORDER_CONSTANTS = APP_CONSTANTS.ORDER;

const validateReq = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ message: ORDER_CONSTANTS.ERRORS.MISSING_ID });
  }
  next();
};

const validateOrder = async (req, res, next) => {
  const { totalFee, serviceId } = req.body;

  if (!totalFee || !serviceId) {
    return res
      .status(400)
      .json({ message: ORDER_CONSTANTS.ERRORS.REQUIRED_PARAM_MISSING });
  }

  next();
};

module.exports = {
  validateReq,
  validateOrder,
};
