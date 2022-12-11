const Service = require('./../models/service');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createService = catchAsync(async (req, res, next) => {
    let {name}=req.body 
   
     if(!name){
        return next(new AppError('No Service Name Found', 404));
    }

    const service = await Service.create({name});
  
    res.status(201).json({
     
      status: 'success',
    data: {
      service
    }
      });
  });

exports.updateService = catchAsync(async (req, res, next) => {
   
    const service = await Service.findByIdAndUpdate(req.params.id , req.body, {
        new: true,
     });
  
    if (!service) {
      return next(new AppError('No service found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        service
      }
    });
  });

exports.getAllService = catchAsync(async (req, res, next) => {
    const services = await Service.find({});
   
    if (!services) {
      return next(new AppError('No services found', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        services
      }
    });
  });

exports.getService = catchAsync(async (req, res, next) => {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return next(new AppError('No service found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        service
      }
    });
  });
  
exports.deleteService = catchAsync(async (req, res, next) => {
    const service = await Service.findByIdAndDelete(req.params.id);
  
    if (!service) {
      return next(new AppError('No service found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });