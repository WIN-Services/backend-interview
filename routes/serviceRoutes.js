const express = require('express')
const router = express.Router()
const ServiceController = require('../controllers/serviceController');

router.route('/create').post(ServiceController.createService);
router.route('/all').get(ServiceController.getAllService);
router.route('/:id').get(ServiceController.getSingleService);
router.route('/update/:id').put(ServiceController.updateService);
router.route('/delete/:id').delete(ServiceController.deleteService);


module.exports = router;