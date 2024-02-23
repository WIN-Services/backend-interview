const express = require('express');
const serviceController = require('../controllers/serviceController');
const validator = require('../middlewares/validator');

const  router = express.Router();

router.get('/', serviceController.getAllServices);
router.post('/', validator.serviceValidator, serviceController.createService);
router.get('/:id', serviceController.getService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;