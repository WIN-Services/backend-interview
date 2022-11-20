const { controllerBuilder } = require('../helpers/utils');

const {
    getAllOrderList,
    createOrder,
    getOrderByID,
    deleteOrder,
    updateOrder
} = require('../services/order');

const list = async (req, res) => {
    /* Call the controller builder */
    const response = await controllerBuilder({
        controllerName: 'Get Order List',
        serviceCall: getAllOrderList,
        serviceData: req,
        succesMsg: 'Order List Retrieved Successfully',
    });

    return res.status(response.status).send(response);
};

const create = async (req, res) => {
    /* Call the controller builder */
    const response = await controllerBuilder({
        controllerName: 'Create New Order',
        serviceCall: createOrder,
        serviceData: req,
        succesMsg: 'New Order Created Successfully',
    });

    return res.status(response.status).send(response);
};

const getAnOrderDetails = async (req, res) => {
    /* Call the controller builder */
    const response = await controllerBuilder({
        controllerName: 'Get an Order detail',
        serviceCall: getOrderByID,
        serviceData: req,
        succesMsg: 'Order Detail Retrieved Successfully',
    });

    return res.status(response.status).send(response);
};

const remove = async (req, res) => {
    /* Call the controller builder */
    const response = await controllerBuilder({
        controllerName: 'Remove Order',
        serviceCall: deleteOrder,
        serviceData: req,
        succesMsg: 'Order Deleted Successfully',
    });

    return res.status(response.status).send(response);
};

const update = async (req, res) => {
    /* Call the controller builder */
    const response = await controllerBuilder({
        controllerName: 'Update Order',
        serviceCall: updateOrder,
        serviceData: req,
        succesMsg: 'Order Updated Successfully',
    });

    return res.status(response.status).send(response);
};

module.exports = {
    list,
    create,
    getAnOrderDetails,
    remove,
    update
}