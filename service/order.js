const orderRepository = require("../repository/order");

async function fetchAllOrders() {
    let data = await orderRepository.fetchAllOrders("order");
    return data;
}

async function fetchOneOrder(orderId) {
    let data = await orderRepository.fetchOneOrder(orderId);
    return data;
}

async function updateOrder(body) {
    let data = await orderRepository.updateOrder(body);
    return data;
}

async function createOrder(body) {
    let order = await orderRepository.createOrder(body);
    return order;
}

async function deleteOrder(orderId) {
    let deleteDoc = await orderRepository.deleteOrder("id",(orderId));
    return deleteDoc;
}


function _timeDiff(timestamp1, timestamp2) {
    const differenceInMilliseconds = Math.abs(timestamp2 - timestamp1);
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
    return differenceInHours;
}


async function checkOrderTimeGap(body) {
    let prevOrder = await orderRepository.fetchPrevOrder();
    let timeDiff = _timeDiff(body.datetime, prevOrder.datetime);
    if (timeDiff>3) {
        return false;
    }
    return true;
}

async function timeDiffForOrderModif(time1, time2) {
    let timeDiff = _timeDiff(time1, time2);
    if (timeDiff>3) {
        return true;
    }
    return false;
}




module.exports = {
    fetchAllOrders,
    fetchOneOrder,
    updateOrder,
    createOrder,
    deleteOrder,
    checkOrderTimeGap,
    timeDiffForOrderModif
};
