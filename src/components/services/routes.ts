import express from 'express'

import createService from './controllers/create'

const router = express.Router()

router.post('/create', createService)


export default router
