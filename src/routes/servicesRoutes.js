const express = require('express');
const serviceController = require('../controllers/servicesController');

const router = express.Router();

// CRUD endpoints for services
router.post('/', serviceController.createService);
router.get('/:id', serviceController.getService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);
router.get('/', serviceController.getAllServices);

module.exports = router;
