const { ServiceModel } = require("../../../db/models/services");

const { OrderModel } = require("../../../db/models/orders");
const mongoose = require("mongoose");
const { nextTick } = require("async");
const { ErrorResponse, notFoundResponse, validationError } =require( '../../common/utils/errorResponse.js')
const { successResponse } =require( '../../common/utils/successResponse');
class AgendaJobRepository {
  constructor() {}
  async createOrder(orderDetail) {
    try {
      const { user, services } = orderDetail;
      if (!user)
      return ValidationError(res,'Please provide user id')
      const pipeline = [
        {
          $match: {
            user: user,
            datetime: { $gte: new Date(Date.now() - 3 * 60 * 60 * 1000) },
          },
        },
        {
          $limit: 1,
        },
      ];
      const alreadyCreatedOrder = await OrderModel.aggregate(pipeline);

      if (alreadyCreatedOrder.length > 0)
      return ErrorResponse(res,"you have to wait for some time till 3 hours completed for your last purchase ")
      const servicesId = await ServiceModel.aggregate([
        {
          $match: {
            name: { $in: services },
          },
        },
        {
          $project: {
            _id: 1,
            name: 0,
          },
        },
      ]);
      const order = new OrderModel(orderDetail);
      order["datetime"] = new Date();
      order["services"] = servicesId.map((ser) => ser._id);
      order["totalfee"] = orderDetail["amount"];
      const res = await order.save();
      return {
        data: res,
        msg: " order created succesfully",
      };
    } catch (e) {
      console.log(e);
      return ErrorResponse(res,e)
    }
  }

  async getPaginatedOrderDetailsData(query, pagee = 1, lim = 10) {
    const page = parseInt(pagee) || 1;
    const limit = parseInt(lim) || 10;

    try {
      const totalCount = await OrderModel.find(query).count(); // Get total count of documents in the collection

      const totalPages = Math.ceil(totalCount / limit);
      const offset = (page - 1) * limit;
      if (!query) 
      var data = await OrderModel.find().skip(offset).limit(limit);
      else data = await OrderModel.find(query).skip(offset).limit(limit);

      // Fetch paginated data

      return {
        msg:'records fetched',
        data:{
        total_pages: totalPages,
        current_page: page,
        results: data,
        }
      };
    } catch (e) {
      console.log(e);
      return ErrorResponse(res,e)

    }
  }

  async deleteOrder(deleteObj = {}) {
    try {
      let query = {};
      if (!deleteObj) {
        return validationError(res,'order id required ')
      }
      if (deleteObj.hasOwnProperty("orderId"))
        query = { _id: new mongoose.Types.ObjectId(deleteObj.orderId) };
      else if (deleteObj.hasOwnProperty("user"))
        query = { user: deleteObj.user };
      const orderDetails = await OrderModel.find(query).limit(10);
      if (!orderDetails)
        return notFoundResponse(res,'order id is not valid')
      const canceledScheduled = await OrderModel.deleteMany(query);
      return {
        msg:'order deleted successfully',
        data:
        {
          data: orderDetails,
          deletedCount: canceledScheduled.deletedCount,
        }
      };
    } catch (e) {
      return ErrorResponse(res,e)

    }
  }
  async updateOrderDetails(detailsOrder, orderId) {
    try {
      const { user, amount, services } = detailsOrder;
      if (!amount && (!services || services.length == 0))
      return validationError(res,'please either provide services or amount to update')
      if (!orderId) 
        return validationError(res,'please either provide services or amount to update')
      const orderDetails = await OrderModel.findOne({
        _id: new mongoose.Types.ObjectId(orderId),
        user: user,
      });
      if (!orderDetails)
       return notFoundResponse(res,'order id not found in database')

      const pipeline = [
        {
          $match: {
            user: user,
            _id: new mongoose.Types.ObjectId(orderId),
            datetime: { $gte: new Date(Date.now() - 3 * 60 * 60 * 1000) },
          },
        },
        {
          $limit: 1,
        },
      ];
      const alreadyCreatedOrder = await OrderModel.aggregate(pipeline);

      if (alreadyCreatedOrder.length > 0)
      return validationError(res,'you have to wait for some time till 3 hours completed for this  purchase')

      const servicesId = await ServiceModel.aggregate([
        {
          $match: {
            name: { $in: services },
          },
        },
        {
          $project: {
            _id: 1,
            name: 0,
          },
        },
      ]);
      let query = [];
      if (amount) query.push({ $set: { totalfee: amount } });
      if (services && services.length > 0)
        query.push({
          $set: {
            services: servicesId.map((ser) => ser._id),
          },
        });
      const results = await OrderModel.findByIdAndUpdate(orderId, query, {
        new: true,
      });
      return {
        data: results,
        msg: "successfully updated the order",
      };
    } catch (e) {
      console.log(e);
      return ErrorResponse(res,e)

    }
  }

 
}

module.exports = AgendaJobRepository;
