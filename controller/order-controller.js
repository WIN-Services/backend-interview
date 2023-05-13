const Order = require('./../models/order')
const Service = require('./../models/service')
const OrderCounter = require('./../models/orderCounter')
const {ERROR_LOGGER, INFO_LOGGER, WARN_LOGGER} = require("./../utils/logger")
const {ForbiddenError, NotFoundError} = require('./../utils/errortypes')


// Util functions

const getNextOrderIdValue = async () => {
    let result = {}
    try {
        result = await OrderCounter.findOne({});
    } catch(error){
        ERROR_LOGGER(error)
        if (!result){
            throw ForbiddenError('Hi, the counter collection is not ready or the mongo connectvity is not cool, please run node setup/db_data.js to set this collection up after you are sure that the mongo is connected.')
        }
    }
    return result.orderCounter + 1

}

const updateNextOrderIdValue = async (counter) => {
    let result = {}
    try {
        result = await OrderCounter.findOneAndUpdate({}, {orderCounter: counter}, {new: true});
    } catch(error){
        ERROR_LOGGER(error)
        if (!result){
            throw ForbiddenError('Hi, the counter collection is not ready or the mongo connectvity is not cool, please run node setup/db_data.js to set this collection up after you are sure that the mongo is connected.')
        }
    }
    return result.orderCounter
}

const calcPrice = async (services) =>{
    let result = {}
    try {
        result = await Service.find({});
    } catch (error) {
        throw ForbiddenError('Hi, the services collection is not ready or the mongo connectvity is not cool, please run node setup/db_data.js to set this collection up after you are sure that the mongo is connected.')
    }
    if (!result){
        WARN_LOGGER("The service collection is empty, using hard coded prices now, as $100 for each service")
        return 100 * services.length
    } else{
        let priceMap = result.reduce((acc, i) => {
            acc[i.serviceId] = i.price
            return acc
        }, {})
        return services.reduce((acc, service) => {
            return acc + priceMap[service]
        }, 0)   
    }

}

const handleError = (result, error) => {
    ERROR_LOGGER(error.error || error)
    result.status = error.statusCode || 500;
    result.error = error.error || error;
}

const isValidUpdate = async (orderId) => {
    let order = {}
    order = await Order.findOne({orderId}).select({ "updatedAt": 1, "_id": 0});
    if (!order) throw NotFoundError(`Order id doesn't exist, ${orderId}`)
    return checkDifferenceInHours(new Date(), order.updatedAt) >= 3
}

const checkDifferenceInHours = (date1, date2) => Math.abs((date1.getTime() - date2.getTime()) / 3600000) 


// Exported controller functions

const getAllOrders = async (req, res) => {
    console.log(`Hellow from ${req.path}`)
    let result = {status: 200}

    try {
        result.result = await Order.find({});
    } catch (error) {
        handleError(result, error)
    }
    INFO_LOGGER(`Returned all ${result.result.length} orders`)
    res.status(result.status).json(result);
}

const getThisOrder = async (req, res) => {
    let result = {status: 200}
    const orderId = req.params.order_id;

    try {
        result.result = await Order.findOne({orderId})
        if (!result.result) {
            WARN_LOGGER(`OrderID doesn't exist ${orderId}`)
            throw NotFoundError(`OrderID doesn't exist ${orderId}`)
        }
    } catch (error) {
        handleError(result, error)
    }
    res.status(result.status).json(result);
}

const createOrder = async (req, res) => {
    const {services} = req.body;
    const temp = {services, createdAt: new Date(), updatedAt: new Date()} 
    let result = {status: 200}
    
    try {
        temp.orderId = await getNextOrderIdValue()
        temp.totalFee = await calcPrice(services)
        const order = new Order(temp);
        result.result = await order.save();
        updateNextOrderIdValue(temp.orderId)
        INFO_LOGGER(`Order created successfully, ${result.result}`)
    } catch (error) {
        ERROR_LOGGER(`Failed to create order`)
        handleError(result, error)
    }
    res.status(result.status).json(result);
}

const updateOrder = async (req, res) => {
    let result = {status: 200}
    const {services, orderId} = req.body;
    try {
        totalFee = await(calcPrice(services))
        if (! await isValidUpdate(orderId)) {
            throw ForbiddenError("This is not a valid update, please wait for 3 hours before updating it")
        }
        result.result = await Order.updateOne({orderId}, {services, totalFee, updatedAt: new Date()})
        if (result.result) INFO_LOGGER(`Sunccessfully updated the order: ${JSON.stringify(result.result)}`)
    } catch(error){
        ERROR_LOGGER(`Failed to update order, ${orderId}`)
        handleError(result, error)
    }
    res.status(result.status).json(result);
}

const deleteOrder = async (req, res) => {
    let result = {status: 200}
    const {orderId} = req.body;
    try {
        if (! await isValidUpdate(orderId)) {
            throw ForbiddenError("This is not a valid update, please wait for 3 hours before updating it")
        }
        result.result = await Order.deleteOne({orderId})
        if (result.result) INFO_LOGGER(`Sunccessfully deleted the order: ${JSON.stringify(result.result)}`)
    } catch(error){
        ERROR_LOGGER(`Failed to delete order, ${orderId}`)
        handleError(result, error)
    }

    res.status(result.status).json(result);
}

module.exports = {getAllOrders, getThisOrder, createOrder, updateOrder, deleteOrder}
