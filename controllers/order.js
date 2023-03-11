const {Op} = require('sequelize')
const orders = require('../models/order')

async function getOrderById(req, res){
    console.log('GET /order/:id request');
    try {
        const order_id = parseInt(req.params.id);

        if(!Number.isInteger(order_id)){
            return res.status(400).send({status: 'failure', message: 'Invalid type! /:id must be integer', data: null})
        }

        const order = await orders.findOne({ where : { id : order_id} })
        if(order){
            return res.status(200).send({
               status: "Success",
               message: "found order",
               data: order
            })
        }
        else{
            return res.status(404).send({
                status: "failure",
                message: "Not found!",
                data: null
            })
        }
    } catch (err) {
        console.log('error occured. ', err)
        return res.status(500).send({
            status: "Failure",
            message: "Internal Server Error!",
            data: null
        })
    }
}

async function getAllOrders(req, res){
    console.log('GET /orders request');
    try{
        const dbResponse = await orders.findAll()
        if(Array.isArray(dbResponse) && dbResponse.length > 0){
            return res.status(200).send({
                status: "Success",
                message: "orders found",
                data: dbResponse
             })
        }else{
            return res.status(200).send({
                status: "Success",
                message: "No order exist!",
                data: dbResponse
            })
        }
    }
    catch(err){
        console.log('error occured. ', err)
        return res.status(500).send({
            status: "Failure",
            message: "Internal Server Error!",
            data: null
        })
    }
}

async function createOrder(req, res){
    console.log('POST /order request');
    try {
        const {total, datetime, services} = req.body ;

        //recent three hour window check
        const orderPresent = await islastThreeHourOrderExists()
        if(orderPresent == true){
            return res.status(409).send({
                status : "failure",
                message : "Last Three Hours Order Already Present! Please Try After Sometime",
                data : null
            });
        }
    
        const dbResponse = await orders.create({ total, datetime, services })
        return res.status(201).send({
            status : "Success",
            message : "Order created successfully!",
            data : dbResponse
        })
        
    } catch (err) {
        console.log("something went wrong.", err)
        return res.status(500).send({
            status: "Failure",
            message: 'Something Went Wrong!',
            data : null
        })
    }
}

async function updateOrder(req, res){
    console.log('PUT /order/:id request');
    try {
        const order_id = parseInt(req.params.id);
        if(!Number.isInteger(order_id)){
            return res.status(400).send({status: 'failure', message: 'Invalid type! /:id must be integer', data: null})
        }

        //recent three hour window check
        const orderPresent = await islastThreeHourOrderExists()
        if(orderPresent == true){
            return res.status(409).send({
                status : "failure",
                message : "Last Three Hours Order Already Present! Please Try After Sometime",
                data : null
            });
        }

        const {total, datetime, services} = req.body ;
    
        let dbResponse = await orders.update( { datetime, total, services }, { where : {id: order_id} });
        if(dbResponse[0] == 1){
            return res.status(201).send({
                status: "Success",
                message: 'Order updated successfully!',
                data : dbResponse
            })
        }else{
            return res.status(404).send({
                status: "Failure",
                message: `order for id: ${order_id} not found!`,
                data : null
            })
        }

    } catch (err) {
        console.log("something went wrong.", err)
        return res.status(500).send({
            status: "Failure",
            message: 'Something Went Wrong!',
            data : null
        })
    }
}

async function deleteOrder(req, res){
    console.log('DELETE /order/:id request');
    try {
        const order_id = parseInt(req.params.id);
        
        if(!Number.isInteger(order_id)){
            return res.status(400).send({status: 'failure', message: 'Invalid type! /:id must be integer', data: null})
        }
        
        const dbResponse = await orders.destroy({ where : {id : order_id} })
        return res.status(200).send({
            status: "Success",
            message: 'Order deleted!',
            data : dbResponse
        })

    } catch (err) {
        console.log("something went wrong.", err)
        return res.status(500).send({
            status: "Failure",
            message: 'Something Went Wrong!',
            data : null
        })
    }
}

function islastThreeHourOrderExists(){
    const now = new Date();
    const threeHoursAgo = new Date(now.getTime() - 3*60*60*1000);

    return new Promise((resolve, reject) => {
        orders.count({
            where: {
                datetime: {
                    [Op.between]: [threeHoursAgo, now],
                },
            },
        })
        .then((dbResponse) => {
            console.log('recent three hours order count:', dbResponse);
            return resolve(dbResponse > 0)
        })
        .catch((err) => {
            return reject(err);
        })
    });
}

module.exports = {
    getOrderById,
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder
}