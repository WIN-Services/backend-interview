const { msg } = require("../../../config/message");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../helper/errorResponse");
const Services = require("../models/service.model");

// @desc    Add Service
// @route   POST/api/v1/service/create
// access   Public
exports.addService = asyncHandler(async (req, res, next) => {
  if (!req.body.name) {
    return next(new ErrorResponse(msg.requiredServiceName, 409));
  }

  let service = await Services.create({
    name: req.body.name,
  });

  res.status(200).json({
    success: true,
    message: "Service Created Successfully",
    data: service,
  });
});

// @desc    Update Service
// @route   POST/api/v1/service/update
// access   Public
exports.updateService = asyncHandler(async (req, res, next) => {
  if (!req.params.serviceId) {
    return next(new ErrorResponse(msg.requiredServices, 409));
  }
  let service = await Services.findByIdAndUpdate(
    req.params.serviceId,
    {
      name: req.body.name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Service Updated Successfully",
    data: service,
  });
});

// @desc    Delete Service
// @route   POST/api/v1/service/delete
// access   Public
exports.deleteService = asyncHandler(async (req, res, next) => {
  if (!req.params.serviceId) {
    return next(new ErrorResponse(msg.requiredServices, 409));
  }
  let service = await Services.findByIdAndDelete(req.params.serviceId);

  res.status(200).json({
    success: true,
    message: `Service Deleted`,
  });
});

// @desc    Get All Services
// @route   POST/api/v1/service/all
// access   Public
exports.allService = asyncHandler(async (req, res, next) => {
  let services = await Services.find({});

  res.status(200).json({
    success: true,
    message: `All Services fetched Successfully`,
    data: services,
  });
});

// @desc    Get Services
// @route   POST/api/v1/service/filter
// access   Public
exports.getServicesByFilters = asyncHandler(async (req, res, next) => {
    let innerQuery ={}
    if (req.query.serviceId) {
        innerQuery._id = req.query.serviceId
      }
      if(req.query.name){
        innerQuery.name = req.query.name
      }
      let services = await Services.find(innerQuery);


  res.status(200).json({
    success: true,
    message: `Services fetched Successfully`,
    data: services,
  });
});
