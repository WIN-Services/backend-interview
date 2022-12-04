'use strict'
const { OrderSchema, ServiceSchema } = require('../schema/schema');
const { getOrderId, addHours, getId }= require('../utils/utils');

async function updateOrder (req, res) {
    try{
        let orderIdSearchObj = await OrderSchema.find({id:req.query.id},{_id:0, __v:0})
        if(orderIdSearchObj && orderIdSearchObj[0].deletionFlag == false){
        let dbResponse
        let orderNameFlag = false
        let orderNameUpdationFlag = false
        let orderQuantityFlag = false
        let orderQuantityUpdationFlag = false
        let updObj = new OrderSchema({
            id : req.query.id,
            orderName : req.body.orderName,
            orderQuantity : req.body.orderQuantity,
        })
        let currentTime = new Date()
        let data = await OrderSchema.findOne({ id: updObj.id})
        console.log(data)
        let checkTime = addHours(3, data.createdAt)
        if(checkTime < currentTime){        
            if (updObj.orderName != data.orderName) {
                orderNameUpdationFlag = true
                dbResponse = await OrderSchema.updateOne({id: updObj.id},{$set:{orderName: updObj.orderName}})
                if (dbResponse.modifiedCount > 0) orderNameFlag = true
            } if (updObj.orderQuantity != data.orderQuantity) {
                orderQuantityUpdationFlag = true
                dbResponse = await OrderSchema.updateOne({id: updObj.id},{$set:{orderQuantity: updObj.orderQuantity}})
                if (dbResponse.modifiedCount > 0 ) orderQuantityFlag = true 
            }
            if((updObj.orderName == data.orderName) && (updObj.orderQuantity == data.orderQuantity)){
                res.status(200).json({ message: "Order Details already match"})
            }
            if((orderNameFlag && orderNameUpdationFlag) || ( orderQuantityFlag && orderQuantityUpdationFlag)){
                res.status(200).json({  message: "Order Updated Successfully" })
            }
        }
        else{
            res.status(200).send({  error: "Order Created at: " + data.createdAt, message:"Please try again, post 3 hours of order creation"})
        }
    }
    else{
        res.status(404).send({ message: "Order does not exist"})
    }
    }
    catch(e){
        console.log({ e })
        res.status(404).send({ message: "Order Creation Failed"})
    }
}

async function getOrderById(req, res){
    try{
        let id = req.params.id
        let orders = await OrderSchema.find({ id: id}, {_id:0, __v:0})
        console.log(orders)
        if(orders && orders[0].deletionFlag == false){
            let data = orders.map(val=> {
                return {
                    id: val.id,
                    totalfee: val.totalfee,
                    serviceId: val.serviceId,
                    createdAt: val.createdAt,
                    orderName: val.orderName,
                    orderType: val.orderType,
                    orderQuantity: val.orderQuantity
                }
            })
            res.status(200).send({ message: "Please find the Order Details", data: data})
        }
        else{
            res.status(404).send({ message: "Order does not exist"}) 
        }
    }
    catch(e){
        console.log({ e })
        res.status(404).send({ message: "Order does not exist"})
    }
}

async function getAllOrders(req,res){
    try{
        let orders = await OrderSchema.find({}, {_id:0, __v:0})
        console.log(orders)
        if(orders && orders[0].deletionFlag == false){
            let data = orders.map(val=> {
                return {
                    id: val.id,
                    totalfee: val.totalfee,
                    serviceId: val.serviceId,
                    createdAt: val.createdAt,
                    orderName: val.orderName,
                    orderType: val.orderType,
                    orderQuantity: val.orderQuantity
                }
            })
            res.status(200).send({ message: "Please find the list of Orders Placed", data: data})
        }
        else{
            res.status(404).send({ message: "Order does not exist"}) 
        }
    }
    catch(e){
        console.log({ e })
        res.status(404).send({ message: "Order does not exist"})
    }
}

async function cancelOrder(req, res){
    try{
        let orderIndex = req.params.id
        let orderIdCheck = await OrderSchema.find({id: orderIndex}, {_id:0, __v:0})
        if(orderIdCheck[0].deletionFlag == false){
            await OrderSchema.update({id:orderIndex},{$set: {deletionFlag: true}})
            if (orderIndex) return res.status(404).json({})
        }
        else{
            res.status(404).send({ message: "Order does not exist"})
        }
    }
    catch(e){
        console.log({ e })
        res.status(404).send({ message: "Order does not exist"})
    }
}

async function requestService(req, res){
    try{
        let orderId = req.params.id
        let dbResponse = await OrderSchema.find({id: orderId},{_id:0,__v:0})
        console.log(dbResponse[0])
        if (dbResponse[0] && dbResponse[0].deletionFlag == false){
            let rqstServObj = {
                name: req.body.name,
                serviceId: getId()
            }
            let requestObj = new ServiceSchema(rqstServObj)
            let ok = await requestObj.save()
            if(ok){
                let ok = await OrderSchema.updateMany({id : orderId},{$push:{serviceId: requestObj._id}})
                if(ok.modifiedCount){
                    let responseData = {
                        serviceId : rqstServObj.serviceId,
                        name : rqstServObj.name,
                        orderId : orderId,
                        serviceStatus: requestObj.serviceStatus,
                        serviceEngineerName: requestObj.serviceEngineerName,
                        serviceEngineerNumber: requestObj.serviceEngineerNumber,
                    }
                    res.status(200).send({  message: "Service Request Successful", serviceDetails: responseData })
                }
            }   
        }
        else{
            res.status(404).send({  message: "OrderId does not exist" })
        }
}
    catch(e){
        console.log({ e })
        res.status(500).send({ message: "Service Request Failed"})
    }
}

async function getAllServicesByOrderId(req, res){
    try{
        let services_list = await OrderSchema.find({id:req.params.id}, {_id:0, __v:0})
        if(services_list && services_list[0].deletionFlag == false){
        if (services_list[0].serviceId.length >0){
            let data
            for (let i = 0; i <= (services_list[0].serviceId.length -1); i++){
                data = await ServiceSchema.find({_id : services_list[0].serviceId},{_id:0, __v:0})
            }
            res.status(200).send({  message: "All Services Requested for OrderId " + req.params.id, serviceDetails: data })
        }
        else{
            res.status(404).send({  message: "Services do not exist for this OrderId" })
        }
        }
    else{
        res.status(404).send({  message: "OrderId does not exist" })
    }
    }
    catch(e){
        console.log({ e })
        res.status(500).send({ message: "Service Request Failed"})
    }
}

async function createOrder(req, res){
    try{
        let orderObj = new OrderSchema({
            createdAt: new Date(),
            id: getOrderId(),
            orderName: req.body.orderName,
            orderQuantity: req.body.orderQuantity,
            orderType: req.body.orderType
        })
        console.log(orderObj)
        await orderObj.save()
        res.status(200).send({  message: "Order Placed Successfully", orderId: orderObj.id })
    }
    catch(e){
        console.log({ e })
        res.status(500).send({ message: "Order Creation Failed"})
    }
}


module.exports = { createOrder, updateOrder, getOrderById, getAllOrders, cancelOrder, requestService, getAllServicesByOrderId}