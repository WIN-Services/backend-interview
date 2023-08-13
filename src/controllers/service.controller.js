const statusCodes = require("http-status");
const apiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { crud, negate } = require("../utils/messageHandler");
const { serviceModelService, orderServicesModelService } = require("../services");
const model = require("../models/index");

class ServiceController {
  getAllServices = catchAsync(async (req, res) => {
    const services = await serviceModelService.findAll();

    if(!services.length) {
      res.status(statusCodes.NOT_FOUND).json(apiResponse(negate("Service", "nf"),[], "f"));
      return 
    }
    
    res.status(statusCodes.OK).json(apiResponse(crud("All services"), services));
  });

  getServiceById = catchAsync(async (req, res) => {
    const service_id = req.params.serviceId;

    const service = await serviceModelService.findByPk(service_id);

    if (!service) {
      res.status(statusCodes.NOT_FOUND).json(apiResponse(negate("Service", "nf"), [], "f"));
      return 
    }

    res.status(statusCodes.OK).json(apiResponse(crud("Service"), service));
  });

  createService = catchAsync(async (req, res) => {
    const { name } = req.body;

    let service = await serviceModelService.findOne({where:{ name }});
    if (service) {
      res.status(statusCodes.BAD_REQUEST).json(apiResponse(negate("Service", "nf", false), [], "f"));
      return 
    }

    const newService = await serviceModelService.create({ name });
    if (!newService) {
      return res.status(statusCodes.NOT_IMPLEMENTED).json(apiResponse(crud("Service","c", false), [], "f"));
    }

    res.status(statusCodes.CREATED).json(apiResponse(crud("Service", "c"), newService));
  });

  updateService = catchAsync(async (req, res) => {
    const service_id = req.params.serviceId;
    const { name } = req.body;

    let service = await serviceModelService.findByPk(service_id);
    if (!service) {
      res.status(statusCodes.BAD_REQUEST).json(apiResponse(negate("Service", "nf"), [], "f"));
      return 
    }

    let queryOptions = {
      where: {
        name
      }
    }

    let serviceName = await serviceModelService.findAll(queryOptions);
    if (serviceName.length){
      res.status(statusCodes.BAD_REQUEST).json(apiResponse(negate("Requested services name", "nf", false), [], "f"));
      return 
    }

    queryOptions = {
      where: {
        id: service_id
      }
    }
    
    let orderServices = await orderServicesModelService.findAll(queryOptions);
    if (orderServices.length) {
      res.status(statusCodes.BAD_REQUEST).json(apiResponse("Service must not be associated with an order", [], "f"));
      return 
    }

    

    let requestbody = { name }

    let updateService = await serviceModelService.update(requestbody,queryOptions);
    if (!updateService) {
      res.status(statusCodes.NOT_IMPLEMENTED).json(apiResponse(crud("Service","u", false), [], "f"));
      return 
    }

    res.status(statusCodes.ACCEPTED).json(apiResponse(crud("Service", "u")));
  });

  deleteService = catchAsync(async (req, res) => {
    const service_id = req.params.serviceId;

    let service = await serviceModelService.findByPk(service_id);
    if (!service) {
      res.status(statusCodes.BAD_REQUEST).json(apiResponse(negate("Service", "nf"), [], "f"));
      return 
    }

    let queryOptions = {
      where: {
        service_id
      }
    }

    let orderServices = await orderServicesModelService.findAll(queryOptions);
    if (orderServices.length) {
      res.status(statusCodes.BAD_REQUEST).json(apiResponse("Service must not be associated with an order", [], "f"));
      return 
    }

    queryOptions = {
      where: {
        id: service_id
      }
    }


    let deleteService = await serviceModelService.destroy(queryOptions);
    if (!deleteService) {
      res.status(statusCodes.NOT_IMPLEMENTED).json(apiResponse(crud("Service","u", false), [], "f"));
      return 
    }

    res.status(statusCodes.NO_CONTENT).json(apiResponse(crud("Service", "d")));
  });
}

module.exports = new ServiceController();
