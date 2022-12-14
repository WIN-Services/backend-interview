const express = require('express')

const {
    getServices,
    getService,
    createService,
    deleteService,
    updateService
} =require('../controllers/serviceController')

const router = express.Router()


router.get('/', getServices)

router.get('/:id', getService)

router.post('/', createService)

router.delete('/:id', deleteService)

router.put('/:id', updateService)


module.exports = router