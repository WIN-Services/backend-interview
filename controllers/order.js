

function getOrderById(req, res){
    console.log('GET /order/:id request');
    res.send('GET order by id request')
}

function getAllOrders(req, res){
    console.log('GET /orders request');
    res.send('GET all orders.')
}
function createOrder(req, res){
    console.log('POST /order request');
    res.send('POST create order request')
}

function updateOrder(req, res){
    console.log('PUT /order/:id request');
    res.send('PUT update order by id request')
}

function deleteOrder(req, res){
    console.log('DELETE /order/:id request');
    res.send('DELETEGET order by id request')
}

module.exports = {
    getOrderById,
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder
}