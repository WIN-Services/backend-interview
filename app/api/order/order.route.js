const { Router } = require('express');

const orderController = require('./order.controller');
const { successMessage } = require('../../helpers')

const route = Router();

module.exports = app => {
  app.use('/order', route);

  route.post('/', (req, res, next) =>
    orderController
      .createOrder(req.body)
      .then(result => res.json({ data: result }))
      .catch(err => next(err))
  );

  route.put('/:orderId', (req, res, next) =>
    orderController
      .updateOrder(req.params.orderId, req.body)
      .then(result => res.json({
        message: successMessage.ORDER_UPDATED,
        data: result
      }))
      .catch(err => next(err))
  );

  route.get('/', (req, res, next) =>
    orderController
      .getOrders()
      .then(result => res.json({ data: result }))
      .catch(err => next(err))
  );

  route.get('/:orderId', (req, res, next) =>
    orderController
      .getOrderById(req.params.orderId)
      .then(result => res.json({ data: result }))
      .catch(err => next(err))
  );

  route.delete('/:orderId', (req, res, next) =>
    orderController
      .deleteOrderById(req.params.orderId)
      .then(result => res.json({
        message: successMessage.ORDER_DELETED,
        data: result
      }))
      .catch(err => next(err))
  )
};
