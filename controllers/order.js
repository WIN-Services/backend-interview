const orders = require('../models/order')

function getOrderById(req, res){
    console.log('GET /order/:id request');
    res.send('GET order by id request')
}

function getAllOrders(req, res){
    console.log('GET /orders request');
    res.send('GET all orders.')
}
async function createOrder(req, res){
    console.log('POST /order request');

    const {total, datetime, services} = req.body ;

    await orders.create({ total, datetime, services })
    .then((response) => {
        return res.status(201).send({
            success : true,
            data : response
        })
    }).catch((err) => {
        console.log(err)
        return res.status(400).send({
            success : false,
            data : 'Someting went wrong!'
        })
    })
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