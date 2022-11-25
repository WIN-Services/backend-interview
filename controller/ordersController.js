const orderService = require('../services/orderService');

const orderController = {
    async create(req, res, next){
        try{
            await orderService.create(req.body);
            res.status(201).send('Order created');
        }catch(err){
            next(err);
        }
    },
    async getOrderById(req, res, next){
        try{
            let order = await orderService.getOrderById(req.params.orderId);
            res.send(order);
        }catch(err){
            next(err);
        }
    },
    async update(req, res, next){
        try{
            await orderService.update(req.params.orderId, req.body);
        }catch(err){
            next(err);
        }
    },
    async deleteOrderById(req, res, next){
        try{
           let id = await orderService.deleteOrderById(req.params.orderId);
           if(id) res.status(200).send('Order deleted successfully');
        }catch(err){
            next(err);
        }
    },
    async getAllOrders(req, res, next){
        try{
            let orders = await orderService.getAllOrders(); 
            res.send(orders);
        }catch(err){
            next(err);
        }
    },
}

module.exports = orderController;