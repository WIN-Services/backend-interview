const express = require("express");
const router = express.Router();

const { addService } = require("../controllers/service_management");
const { addOrders, fetchOrder, fetchAll, deleteOrder, updateOrder } = require("../controllers/order_management");

router.post('/serviceManagement', addService)
router.post('/orderManagement', addOrders)
router.get('/orderManagement', fetchOrder)
router.get('/orderManagementFetchAll', fetchAll)
router.delete('/orderManagement', deleteOrder)
router.put('/orderManagement', updateOrder)


module.exports = router;