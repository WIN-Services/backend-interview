import { body, param, query, validationResult } from 'express-validator';

export function validate(method) {
  switch (method) {
    case 'createOrder': {
      return [
        body(`serviceIds`, `serviceId is required field`).exists().isArray(),
        body('userId').exists().isNumeric()
      ]
    }
    case 'updateOrder': {
      return [
        body(`serviceIds`, `serviceIds is required field`).exists().isArray(),
        body('totalFee', 'totalFee is required field').exists().isNumeric(),
        param('orderId', 'order id is required').exists().isString()

      ]
    }
    case 'getOrder': {
      return [
        query('orderIds'),
        query('limit'),
        query('skip')
      ]
    }
    case 'deleteOrder': {
      return [
        param('orderId').exists()
      ]
    }
  }
}

export function schemaValidator(req, res) {
  return validationResult(req);
}
