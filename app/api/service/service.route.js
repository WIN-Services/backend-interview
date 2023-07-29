const { Router } = require('express');

const serviceController = require('./service.controller');
const { successMessage } = require('../../helpers')

const route = Router();

module.exports = app => {
  app.use('/service', route);

  route.post('/', (req, res, next) =>
    serviceController
      .addService(req.body)
      .then(result => res.json({ data: result }))
      .catch(err => next(err))
  );

  route.put('/:serviceId', (req, res, next) =>
    serviceController
      .updateService(req.params.serviceId, req.body)
      .then(result => res.json({
        message: successMessage.SERVICE_UPDATED,
        data: result
      }))
      .catch(err => next(err))
  );

  route.get('/', (req, res, next) =>
    serviceController
      .getServices()
      .then(result => res.json({ data: result }))
      .catch(err => next(err))
  );

  route.get('/:serviceId', (req, res, next) =>
    serviceController
      .getServiceById(req.params.serviceId)
      .then(result => res.json({ data: result }))
      .catch(err => next(err))
  );

  route.delete('/:serviceId', (req, res, next) =>
    serviceController
      .deleteServiceById(req.params.serviceId)
      .then(result => res.json({
        message: successMessage.SERVICE_DELETED,
        data: result
      }))
      .catch(err => next(err))
  )
};
