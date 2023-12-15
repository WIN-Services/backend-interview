import express from 'express';
import { OrderController } from '../controller/index.js';
const router = express.Router();

router
    .post('/', OrderController.createOrder)
    
    .get('/:id', OrderController.getOrder)
    
    .put('/:id', OrderController.updateOrder)
    
    .delete('/:id', OrderController.deleteOrder)
    
    .get('/', OrderController.getAllOrders);

export default router;
