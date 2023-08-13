const express = require('express');
const router = express.Router();
const { serviceValidation } = require('../validations/index');
const { serviceController } = require('../controllers/index');
const validate = require('../middlewares/validate');


router.get(
    '/', 
    serviceController.getAllServices
);

router.get(
    '/:serviceId',  
    validate(serviceValidation.getServiceById), 
    serviceController.getServiceById
);

router.post(
    '/', 
    validate(serviceValidation.createService), 
    serviceController.createService
);

router.patch(
    '/:serviceId', 
    validate(serviceValidation.updateService), 
    serviceController.updateService
);

router.delete(
    '/:serviceId',
    validate(serviceValidation.deleteService), 
    serviceController.deleteService
);


module.exports = router;
