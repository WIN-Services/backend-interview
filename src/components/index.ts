import express from 'express'
import serviceRouter from './services/routes'
import orderRouter from './orders/routes'
const router = express.Router()


router.use('/service', serviceRouter)
router.use('/order', orderRouter)
export default router
