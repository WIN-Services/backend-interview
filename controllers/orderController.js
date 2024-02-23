const orderServices = require('../services/orderService');

const orderController = {
    createOrder: async (req, res) => {
        try {
            req.body = {...req.body, datetime: new Date((req.body.datetime)) || new Date()};
            
            const result = await orderServices.createOrder(req.body);
            res.status(result.statusCode).json(result);

        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    },
    getOrder: async (req, res) => {
        try {
            const result = await orderServices.getOrder(req.params.id);
            res.status(result.statusCode).json(result);

        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const result = await orderServices.getAllOrders();
            res.status(result.statusCode).json(result);

        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            req.body = {...req.body, datetime: new Date(req.body.datetime) || new Date()};
            
            const result = await orderServices.updateOrder(orderId, req.body);
            res.status(result.statusCode).json(result);

        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
        
            const result = await orderServices.deleteOrder(orderId);
            res.status(result.statusCode).json(result);

        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    }
}


module.exports = orderController;