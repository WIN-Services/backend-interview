let { Order, Services }  = require("./models");

class OrderService {

    async getOrders() {
        let response = await Order.findAndCountAll({
            include: {
                model: Services,
                attributes: ['id', 'name'],
            },
        });
        return response;
    }

    async createOrder(orderData) {
        try {
            const newOrderCreated = await Order.create(orderData)
                                                .then((createdOrder) => {
                                                    return createdOrder.id;
                                                })
            return newOrderCreated;
        }
        catch(error) {
            return false;
        }
    }

    async updateOrder(updatedOrderData) {
        const orderToUpdate = await Order.findByPk(updatedOrderData.id);

        if (!orderToUpdate) {
            return false;
        }

        // Update the order's total_fee
        const newTotalFee =  updatedOrderData.total_fee;
        orderToUpdate.total_fee = newTotalFee;
        await orderToUpdate.save();
        return true;
    }

    async deleteOrder(deleteOrderData) {
        const orderIdToDelete = deleteOrderData.id; 
        const orderToDelete = await Order.findByPk(orderIdToDelete);

        if (!orderToDelete) {
            console.log('Order not found.');
            return false;
        }

        // Delete the order
        await orderToDelete.destroy();

       return true;
    }

}

module.exports = OrderService;