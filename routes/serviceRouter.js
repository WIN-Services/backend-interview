const express = require('express');
const serviceController = require('./../controllers/serviceController');

const router = express.Router();



router
  .route('/')
  .post(serviceController.createService)
  .get(serviceController.getAllService);

  router
  .route('/:id')
  .get(serviceController.getService)
  .put(serviceController.updateService)
  .delete(serviceController.deleteService);


  module.exports = router;