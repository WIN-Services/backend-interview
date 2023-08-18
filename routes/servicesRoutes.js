const express = require('express');
const { getAllServices, createNewService } = require('../controllers/servicesControllers');
const { serviceBodyInput } = require('../validators/servicesValidators');

const router = express.Router();

router.get('/all', getAllServices)
router.post('/', serviceBodyInput, createNewService);

module.exports = router;