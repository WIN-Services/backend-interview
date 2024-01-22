const asyncWrapper = require('../utils/asyncWrapper.js');

class BaseController {
  constructor(x) {
    this.asyncWrapper = asyncWrapper;
  }
}

module.exports = BaseController;