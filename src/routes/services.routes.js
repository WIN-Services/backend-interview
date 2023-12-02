const express = require("express")
const controller = require("../controller/services")
const router = express.Router()

router.post('/service',controller.createService)
router.put('/service',controller.updateService)
module.exports = router