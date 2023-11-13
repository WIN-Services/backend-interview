const express = require('express');
const router = express.Router();
const Service = require("../models/service")

const {getServices, getServiceById, getOrdersForServiceId ,createService, updateServiceById, deleteServiceById} = require("../controllers/services")

router.get('/', getServices)

router.get('/:id',getServiceById)

router.get('/orders/:id', getOrdersForServiceId )

router.post('/',createService)

router.put('/:id',updateServiceById)

router.delete('/:id',deleteServiceById)


module.exports = router;