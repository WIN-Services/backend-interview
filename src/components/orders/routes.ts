import express from 'express'
import orderController from './controllers'

const router = express.Router()

router.post('/', orderController.createOrder)
router.get('/', orderController.getAllOrder)
router.get('/:orderId', orderController.getOrder)
router.put('/:orderId', orderController.updateOrder)
router.delete('/:orderId', orderController.deleteOrder)


export default router
