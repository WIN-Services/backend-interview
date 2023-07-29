let OrderService = require('./service.js');

let orderService = new OrderService();

exports.getOrders = async function(req, res) {
    let response = await orderService.getOrders();
    res.send({
        code: 200,
        message: 'success',
        data: response,
    })
}


exports.addOrders = async function(req, res) {
    try {
        let orderData = req.body;
        let response = await orderService.createOrder(orderData);
        res.send({
            code: 200,
            message: 'Order Created',
            orderId: response
        })
    } catch(error) {
        res.send({
            code: 500, 
            message: 'Internal Server Error'
        })
    }
}


exports.updateOrders = async function(req, res) {
    try {
        let updatedOrder = req.body;
        let response = await orderService.updateOrder(updatedOrder);
        if(!response) {
            res.send({
                code: 200,
                message: 'No Order Found'
            })
        }
        res.send({
            code: 200,
            message: 'Order Updated'
        })
    } catch(error) {
    res.send({
        code: 500,
        message: 'Internal Server Error'
    })
   }
}


exports.deleteOrders = async function(req, res) {
    try {
        let deleteOrder = req.body;
        let response = await orderService.deleteOrder(deleteOrder);
        if(!response) {
            res.send({
                code: 404,
                message: 'No Order Found'
            })
        }
        res.send({
            code: 200,
            message: 'Deleted Order'
        })
    } catch(error) {
        res.send({
            code: 500,
            message: 'Internal Server Error'
        })
   }
}
