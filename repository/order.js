const helpers = require("../helpers/mongoCRUD");

async function createOrder(body) {
    try {
        // return await helpers.insertDocument({id: body.id, datetime:body.datetime , totalfee: body.totalfee, services: [{id:body.id}]}, "OrderMgmt","order");
        return await helpers.insertDocument({ datetime:body.datetime , totalfee: body.totalfee, services: [{id:body.serviceId}]}, "OrderMgmt","order");

    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function fetchPrevOrder() {
    try {
        let prevOrder = await helpers.fetchPreDocumentByKey("id", "OrderMgmt", "order");
        return prevOrder[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteOrder(key, OrderId) {
    try {
        console.log(key, OrderId);
        return await helpers.deleteDocument("OrderMgmt", "order", key, OrderId.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function updateOrder(body) {
    try {
        return await helpers.updateDocument(body.value, body.key, body.id, "OrderMgmt","order");
    } catch (error) {
        console.log(error);
        throw error;
    }
}



async function fetchAllOrders(collection) {
    try {
        return helpers.findAllDocuments( "OrderMgmt",collection);
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function fetchOneOrder(orderId) {
    try {
        let order = await helpers.findDocumentByKey("id", orderId, "OrderMgmt","order");
        return order;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = {
    createOrder,
    updateOrder,
    fetchAllOrders,
    fetchOneOrder,
    deleteOrder,
    fetchPrevOrder
};