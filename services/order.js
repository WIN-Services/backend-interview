const { models } = require('../database/index');
const { paginate } = require('../helpers/utils');
const moment = require('moment');


//Get a List of All Orders
const getAllOrderList = async (req) => {
    const { pageIndex, pageSize } = req.query;

    //Validate pageIndex and pageSize
    if (!(pageIndex && pageSize) || (pageIndex < 0 && pageSize < 1)) {
        throw new Error("Invalid PageIndex and PageSize");
    }

    try {
    //Get list of orders with all count
        const orders = await models.order.findAndCountAll({
            include: {
                model: models.service
            },
            ...paginate(pageIndex, pageSize)
        });

        return orders;
    } catch (e) {
        throw new Error(e);
    }
}

//Create New Order
const createOrder = async (req) => {
    const { totalfee, serviceID } = req.body;

    if (!(totalfee && serviceID)) {
        throw new Error('Invalid Input')
    }

    try {
        //check if service exists
        const checkIfServiceExists = await models.service.findByPk(serviceID);
        if (!checkIfServiceExists) {
            throw new Error('Service does not exist')
        }
        const newOrder = await models.order.create({ totalfee, serviceID });

        return newOrder;
    } catch (e) {
        throw new Error(e);
    }
}

//Get Order BY Id
const getOrderByID = async (req) => {
    const { orderID } = req.params;

    try {

        const order = await models.order.findOne({
            where: { orderID },
            include: {
                model: models.service
            }
        });

        if (!order) {
            throw new Error('Order does not exist')
        }

        return order;
    } catch (e) {
        throw new Error(e);
    }
}

//Delete
const deleteOrder = async (req) => {
    const { orderID } = req.body;

    try {

        const order = await models.order.findByPk(orderID);
        if (!order) throw new Error('Order does not exist')

        await order.destroy();

        return order;
    } catch (e) {
        throw new Error(e);
    }
}

//Update Order
const updateOrder = async (req) => {
    const { orderID, totalfee, serviceID, datetime } = req.body;

    try {

        //Check if order exists
        const order = await models.order.findByPk(orderID);
        if (!order) throw new Error('Order does not exist')


        //Check if order was updated 3 hrs ago
        let orderLastUpdateTime = moment(order.datetime, "hh:mm");
        let currentTime = moment(new Date(), "hh:mm");

        console.log(currentTime.diff(orderLastUpdateTime, "hours"))
        if (currentTime.diff(orderLastUpdateTime, "hours") < 3) {
            throw new Error("Cannot Update the order within 3 hours");
        }


        //Check if service exists
        if (serviceID) {
            const checkIfServiceExists = await models.service.findByPk(serviceID);
            if (!checkIfServiceExists) throw new Error('Service does not exist')
        }


        // Update order
        const updatedOrder = await order.update({
            totalfee: totalfee ? totalfee : order.totalfee,
            serviceID: serviceID ? serviceID : order.serviceID,
            datetime: new Date()
        })


        return updatedOrder;
    } catch (e) {
        throw new Error(e);
    }
}


module.exports = {
    getAllOrderList,
    createOrder,
    getOrderByID,
    deleteOrder,
    updateOrder
}