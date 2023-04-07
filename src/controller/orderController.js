const Order = require('../model/order')

async function getAllOrders(req, res){

    try{

        let orders = await Order.findAll()

        if(!res)
            return orders

        res.status(200).send({
            successCode: 1,
            orders: orders
        })

    }catch(error){
        console.error('error in get all orders', error)
        res.status(500).send({
            statusCode: 0,
            message: 'Failed to Fetch All Order',
            error: error.message
        })
    }

}

async function getOrderById(req, res){

    try{

        let id = req.params.id

        let order = await Order.findOne({
            where: {
                id: id
            },
            logging: false  // logging key is used to log the query
        })

        if(!order){
            let error = new Error(`No order found against this id ${id}`)
            error.status = 404
            throw error
        }

        if(!res){
            return order
        }

        res.status(200).send({
            successCode: 1,
            message: 'order found',
            orders: order
        })

    }catch(error){
        if(!res)
            return error
        
        console.error('error in get order', error)
        res.status(error.status ?? 500).send({
            statusCode: 0,
            error: error.message
        })
    }

}

async function createOrder(req, res){

    try{

        let latestOrder = await Order.findOne({
            attributes: ['createdAt'],
            order: [['createdAt', 'desc']],
            logging: false
        })

        console.log('latest Order', latestOrder)

        // timeDifference is in millisecond
        let timeDifference = (new Date().getTime() - latestOrder.createdAt.getTime())

        if(timeDifference < 3*60*60*1000){
            let error = new Error('Can not create new order as latest order is created not more than 3 hours')
            error.status = 406
            throw error
        }

        let newOrder = await Order.create(req.body)

        if(!res){
            return newOrder
        }

        res.status(201).send({
            statusCode: 1,
            message: 'New Order Has Been Created',
            details: newOrder
        })

    }catch(error){
        console.error('error in creating new order', error)
        res.status(error.status ?? 500).send({
            statusCode: 0,
            message: 'Failed to Create New Order',
            error: error.message
        })
    }

}

async function updateOrder(req, res){

    try{

        let id = req.params.id

        let isOrderExist = await Order.findOne({
            where: {
                id: id
            }
        })

        if(!isOrderExist){
            let error = new Error(`Order does not Exist against id ${id}`, 404)
            error.status = 404
            throw error
        }

        // timeDifference is in millisecond
        let timeDifference = (new Date().getTime() - isOrderExist.updatedAt.getTime())

        if(timeDifference < 3*60*60*1000){  //  3 hrs = 3*60*60*1000 millisecomd
            let error = new Error('Can not update order as latest order is updated not more than 3 hours')
            error.status = 406
            throw error
        }

        let updatedOrder = await Order.update(req.body, {
            fields: Object.keys(req.body),
            where: { id: req.params.id },
            returning: '*'
        })

        if(!res){
            return 'Order details Updated Successfully'
        }

        res.status(200).send({
            statusCode: 1,
            message: 'Order details Updated Successfully',
            details: updatedOrder[1][0]
        })

    }catch(error){
        console.error('error in update recordes', error, error.status)
        res.status(error.status ?? 500).send({
            statusCode: 0,
            message: 'Failed to update Order',
            error: error.message
        })
    }

}

async function deleteOrder(req, res){

    try{

        let id = req.params.id

        let isOrderExist = await Order.findOne({
            where: {
                id: id
            }
        })

        if(!isOrderExist){
            let error = new Error(`Order does not Exist against id ${id}`)
            error.status = 404
            throw error
        }

        await Order.destroy({
            where: {
                id: id
            },
            force: true   // to permanent deleted from database
        })

        if(!res){
            return 'Order is deleted Successfully'
        }

        res.status(200).send({
            status: 'success',
            message: 'Order is deleted Successfully'
        })

    }catch(error){
        console.error('error in delete records', error)
        if(!res){
            return 'Failed to delete Order'
        }
        res.status(error.status ?? 500).send({
            statusCode: 0,
            message: 'Failed to delete Order',
            error: error.message
        })
    }

}

module.exports = { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder }

