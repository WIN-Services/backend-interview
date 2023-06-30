const OrderManageRepository = require("../repository/orderManagement.repository");
const { v4: uuidv4 } = require("uuid");
const Blob = require("Blob");
const { ErrorResponse, validationError } =require( '../../common/utils/ErrorResponse.js');
const { successResponse } =require ('../../common/utils/successResponse')
class OrderManager {
  constructor() {
    this.orderRepo = new OrderManageRepository();
  }

  async createOrder(orderDetail) {
    try {
      const { amount, services, user } = orderDetail;
      if (amount <= 0)
      return validationError(res,'please provide amount >0',{})
      if (!user || !services || services.length <= 0)
      return validationError(res,'please provide  valid body params')
      const results = await this.orderRepo.createOrder(orderDetail);
      return successResponse(res,'order created successfully', results.msg || '',results.data||[]);
    } catch (e) {
      return ErrorResponse(res,e)
 
    }
  }

  async deleteOrder(req) {
    try {
      const { params } = req;
      const deleteObj = {};
      if (req.url.includes("orderId")) deleteObj["orderId"] = params.id;
      else if (req.url.includes("userId")) deleteObj.user = params.id;
      const result = await this.orderRepo.deleteOrder(deleteObj);
      return successResponse(res,'order deleted successfuly',result);
    } catch (e) {
      console.log(e);
      return ErrorResponse(res,e)

    }
  }

  async updateOrder(orderDetail, orderId) {
    try {
      const { amount, user } = orderDetail;
      if (amount && amount <= 0)
      return validationError(res,'please provide amount >0',{})
      if (!user || !services || services.length <= 0)
      return validationError(res,'please provide  valid body params')
      const results = await this.orderRepo.updateOrderDetails(
        orderDetail,
        orderId
      );
      return successResponse(res,'',results)
    } catch (e) {
      console.log("ppppp", typeof e);
      return ErrorResponse(res,e)

    }
  }

  async getOrderDetailsOfUser(req) {
    try {
      const { params } = req;
      const {query}=req
      const queryObj = {};

      if (req.url.includes("orderId")) queryObj["_id"] = params.id;
      else if (req.url.includes("userId")) queryObj.user = params.id;
      const result = await this.orderRepo.getPaginatedOrderDetailsData(
        queryObj,
        query.page,
        query.limit
      );
      return successResponse(res,'',result)
    } catch (e) {
      return ErrorResponse(res,e)
    }
  }
}

module.exports = { OrderManager };
