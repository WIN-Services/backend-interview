
import * as orderService from '../Services/orders/orderService.js';
import { ErrorResponse, notFoundResponse, validationError } from '../helpers/ErrorResponseHandler.js';
import { successResponse } from '../helpers/SuccessResponseHandler.js';
import { schemaValidator } from '../validators/validators.js';
import { getServices } from '../Services/service/service.js';
import lodash from 'lodash';
const { isEmpty } = lodash;

export async function createOrder(req, res) {
  try {
    //Validation on req.body/query
    const result = schemaValidator(req, res);
    if (!result.isEmpty()) {
      return validationError(res, 'Validation failed', result.array());
    }

    //Check if given service ids are available
    const serviceIds = req.body.serviceIds
    const serviceDetails = await getServices(serviceIds);
    if (serviceDetails.length != serviceIds.length) {
      return ErrorResponse(res, 'Some of the services does not existed!');
    }
    req.body.services = serviceDetails
    //Create order
    await orderService.createOrder(req.body);

    successResponse(res, 'Order created successfully');

  } catch (error) {
    console.log('Error in OrderController::createOrder', error);
    ErrorResponse(res, error);
  }
}

export async function updateOrder(req, res) {

  try {
    //Validation on req.body/query
    const result = schemaValidator(req, res);
    if (!result.isEmpty()) {
      return validationError(res, 'Validation failed', result.array());
    }

    const orderId = req.params.orderId
    const serviceIds = req.body.serviceIds

    const orderDetail = await orderService.getOrderById(orderId);

    if (isEmpty(orderDetail)) {
      return notFoundResponse(res, 'order does not existed');
    }
    if (req.body.totalFee < 0) {
      return validationError(res, 'Invalid request', {});
    }

    if (serviceIds) {
      const serviceDetails = await getServices(serviceIds);
      if (serviceDetails.length != serviceIds.length) {
        return ErrorResponse(res, 'Some of the services does not existed!');
      }
      req.body.serviceIds = serviceDetails;
    }

    await orderService.updateOrder(req.body, orderId);

    successResponse(res, 'Order updated successfully');

  } catch (error) {
    console.log('Error in OrderController::updateOrder', error);
    ErrorResponse(res, error);
  }
}


export async function getOrder(req, res) {

  try {
    const { orderId, limit, skip } = req.query;
    let order;

    if (orderId) {
      order = await orderService.getOrderById(orderId);

    } else {
      order = await orderService.getOrders(limit, skip);
    }

    successResponse(res, order);

  } catch (error) {
    console.log('Error in OrderController::getOrder', error);
    ErrorResponse(res, error);
  }
}

export async function deleteOrder(req, res) {

  try {
    //Validation on req.body/query
    const result = schemaValidator(req, res);
    if (!result.isEmpty()) {
      return validationError(res, 'Validation failed', result.array());
    }

    const orderId = req.params.orderId
    const orderDetail = await orderService.getOrderById(orderId);

    if (isEmpty(orderDetail)) {
      return notFoundResponse(res, 'order does not existed');
    }

    await orderService.deleteOrder(orderId)

    successResponse(res, 'Order deleted successfully');
  } catch (error) {

    console.log('Error in OrderController::deleteOrder', error);
    ErrorResponse(res, error);
  }
}
