const statusCodes = require("http-status");
const apiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");
const { crud, negate } = require("../utils/messageHandler");
const {
  orderService,
  serviceModelService,
  orderServicesModelService,
} = require("../services");
const model = require("../models/index");
const moment = require('moment');
const { Op } = require('sequelize');


class orderController {
  getAllOrders = catchAsync(async (req, res) => {
    const orders = await orderService.findAll();

    if (!orders.length) {
      res.status(statusCodes.NOT_FOUND).json(apiResponse(negate("Orders", "nf"),[],"f"));
      return 
    }
    
    res.status(statusCodes.OK).json(apiResponse(crud("All orders"), orders));
    
  });

  getOrderById = catchAsync(async (req, res) => {
    const order_id = req.params.orderId;

    const order = await orderService.findByPk(order_id);

    if (!order) {
      res.status(statusCodes.NOT_FOUND).json(apiResponse(negate("Order", "nf"), [], "f"));
      return 
    }

    res.status(statusCodes.OK).json(apiResponse(crud("Order"), order));
  });

  createOrder = catchAsync(async (req, res) => {
    const { date_time, total_fee, service_ids } = req.body;

    // Check if there's a pre-existing order within the last 3 hours
    const threeHoursAgo = moment().subtract(3, 'hours');
    const existingOrder = await orderService.findOne({
      where: {
        date_time: {
          [Op.gte]: threeHoursAgo.toISOString(),
        },
      },
    });

    if (existingOrder) {
      return res.status(statusCodes.BAD_REQUEST).json(apiResponse("Cannot create an order within 3 hours of a pre-existing order", [],"f"));
    }

    let queryOptions, requestbody, requestbodyArray;

    const dbTxn = await model.sequelize.transaction();

    queryOptions = {
      where: {
        id: service_ids,
      },
    };

    const services = await serviceModelService.findAll(queryOptions);
    if (services.length !== service_ids.length) {
      res.status(statusCodes.BAD_REQUEST).json(apiResponse("Invalid service IDs provided", [], "f"));
      return 
    }

    requestbody = {
      date_time,
      total_fee,
    };

    const newOrder = await orderService.create(requestbody, {
      transaction: dbTxn,
    });
    if (!newOrder) {
      await dbTxn.rollback();
      res.status(statusCodes.NOT_IMPLEMENTED).json(apiResponse(crud("Order","c", false), [], "f"));
      return 
    }

    requestbodyArray = [];
    for (let service of service_ids) {
      requestbodyArray.push({
        order_id: newOrder.id,
        service_id: service,
      });
    }

    const updateOrderService = await orderServicesModelService.bulkCreate(
      requestbodyArray,
      { transaction: dbTxn }
    );
    if (updateOrderService.length !== service_ids.length) {
      await dbTxn.rollback();
      res.status(statusCodes.NOT_IMPLEMENTED).json(apiResponse(crud("Order","c", false), [], "f"));
      return 
    } 

    await dbTxn.commit();
    newOrder.services = updateOrderService;
    res.status(statusCodes.CREATED).json(apiResponse(crud("Order", "c"), newOrder));
 
  });

  updateOrder = catchAsync(async (req, res) => {
    const order_id = req.params.orderId;
    const { date_time, total_fee } = req.body;

    let queryOptions = {}, requestbody = {};

    let order = await orderService.findByPk(order_id);
    if (!order) {
      res.status(statusCodes.NOT_FOUND).json(apiResponse(negate("Order", "nf"), [], "f"));
      return
    }

    const currentTime = moment();
    const threeHoursAgo = moment().subtract(3, 'hours');

    if (moment(order.date_time).isAfter(threeHoursAgo, 'iso')) {
      res.status(statusCodes.BAD_REQUEST).json(apiResponse("Cannot update within 3 hours of pre-existing order",[],"f"));
      return;
    }

    if (date_time) {
      if (moment(date_time).isAfter(currentTime)) {
        res.status(statusCodes.BAD_REQUEST).json(apiResponse("date_time cannot be in the future",[],"f"));
        return;
      }  
      requestbody.date_time = date_time;
    }
    if (total_fee) {
      requestbody.total_fee = total_fee;
    }

    queryOptions = {
      where: {
        id: order_id,
      }
    };

    let updateOrder = await orderService.update(requestbody, queryOptions);
    if (!updateOrder) {
      res.status(statusCodes.NOT_IMPLEMENTED).json(apiResponse(crud("Order","u", false), [], "f"));
      return 
    }

    res.status(statusCodes.ACCEPTED).json(apiResponse(crud("Order", "u")));
  });

  deleteOrder = catchAsync(async (req, res) => {
    const order_id = req.params.orderId;

    let order = await orderService.findByPk(order_id);
    if (!order) {
      res.status(statusCodes.NOT_FOUND).json(apiResponse(negate("Order", "nf"), [], "f"));
      return 
    }

    let deleteOrder = await orderService.destroy({ where: { id: order_id } });
    if (!deleteOrder) {
      res.status(statusCodes.NOT_IMPLEMENTED).json(apiResponse(crud("Order","d", false), [], "f"));
      return 
    }
    res.status(statusCodes.NO_CONTENT).json(apiResponse(crud("Order", "d")));
  });
}

module.exports = new orderController();
