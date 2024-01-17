const orderServices = require('../services/OrderServices')

class orderController{

    async createOrder(req, res){
        const response = await orderServices.createOrder(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
    async getAllOrders(req, res){
        const response = await orderServices.getAllOrders(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
    async getOrder(req, res){
        const response = await orderServices.getOrder(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
    async updateOrder(req, res){
        const response = await orderServices.updateOrder(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
    async deleteOrder(req, res){
        const response = await orderServices.deleteOrder(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
}

module.exports = new orderController()