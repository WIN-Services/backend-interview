const AppError = require("../utils/appError");
const Service = require('../models/services');

exports.createService = async (req) => {
  const { name } = req.body;
  if (!name) {
    return res.status(422).json(new AppError("Enter name field", 422));
  }
  const data = await Service.create({...req.body});
  return data;
};


exports.getallService = async (req) => {
    const data = Service.find({});
    return data;
}