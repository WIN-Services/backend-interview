const OrderEntity = require("../entity/OrderEntity")
const { ErrorHandler } = require('../services/error');

const orderService = {
    async create(orderModal){
        let duplicateOrder = await this.getOrderById(orderModal.id)
        if(duplicateOrder){
            console.log('duplicate order');
            throw new ErrorHandler(400, "An order exists with same id");
        }
        orderModal.lastUpdated = Date.now();
        const orderEntity = new OrderEntity(orderModal);
        return orderEntity.save();
    },

    async getOrderById(orderId){
        return await OrderEntity.findOne({id: orderId});
    },

    async update(orderId, params){
        let existingOrder = await this.getOrderById(orderId);
        if(existingOrder){
            let currentTime = Date.now();
            let diff = (currentTime-existingOrder.lastUpdated)/(1000*60*60);
            if(diff<=3){
                throw new ErrorHandler(405, "Not allowed to update within 3 hours, please try after sometime");
            }
            if(params.datetime) existingOrder.datetime = params.datatime;
            if(params.totalfee) existingOrder.totalfee = params.totalfee;
            if(params.services){
                exisitingOrder.services = params.services;
            }
            existingOrder.save();
        }else{
            throw new ErrorHandler(400, "OrderId not found");
        }
    },
    async deleteOrderById(orderId){
        let deletedDocs = await OrderEntity.deleteOne({id: orderId});
        if(deletedDocs>0) return 1;
        else throw new ErrorHandler(400, "OrderId not found"); 
    },
    async getAllOrders(){
        return OrderEntity.find();
    }
}

module.exports = orderService