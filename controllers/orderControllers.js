const OrderModel =  require('./../models/orderModels')


// This function is used to create order 
exports.createOrder= async (req, res) => {
    try {
        let body = req.body;
        let orders = await recordsInThreeHourDuration(body.datetime)
        if(orders.length) {
            return sendErrorResponse(res, 405, 'Cannot make An Order! Please wait for atleast 3 hours from last Order made');
        }
        await OrderModel.create(body);
        return sendSuccessResponse(res, 200, 'Record Inserted Successfully')
    } catch(err) {
        return sendErrorResponse(res, 500, 'An Error Occured');
    }
    
}

// This function is used to find order with ID and populate the referenced fields
exports.findOrder = async (req, res) => {
    try {
        let {id} = req.params;
        let records = await OrderModel.find({_id: id}).populate('services');
        if(Object.keys(records).length>0) {
            return sendSuccessResponse(res, 200, 'Records Found', records)
        } else {
            return sendSuccessResponse(res, 404, 'No Records Found')
        }
    } catch(err) {
        return sendErrorResponse(res, 500, 'An Error Occured')
    }
}

// This function is used to find orders and populate the referenced fields
exports.findAllOrders = async (req, res) => {
    try {
        let records = await OrderModel.find({}).populate('services');
        if(records.length>0) {
            return sendSuccessResponse(res, 200, 'Records Found', records)
        } else {
            return sendSuccessResponse(res, 404, 'No Records Found')
        }
    } catch(err) {
        return sendErrorResponse(res, 500, 'An Error Occured')
    }
}



// This function is used to update orders and 
// if orders is being updated within 3 hours of its creation respond with a message can not update
exports.updateOrder = async (req, res) => {
    try {
        let body = req.body;
        let {id} = req.params;
        let order = await OrderModel.find({_id: id});
        if(order.length == 0) {
            return sendSuccessResponse(res, 404, 'No record to Update')
        }

        if((new Date(order[0].datetime).getTime() + 10800000)-Date.now() > -1) {
            return sendSuccessResponse(res, 400, 'Record created during last 3 hrs, Need to Wait  for 3 hours to Update the record');
        }
        delete body.datetime
        delete body.id
        await OrderModel.updateOne({_id: id}, body, {
            new:true,
            runValidators:true
        });
        return sendSuccessResponse(res, 200, 'Record Updated Successfully')
    } catch(err) {
        return sendErrorResponse(res, 500, 'An Error Occured')
    }
}


// This function is used to create order 
exports.deleteOrder = async (req, res) => {
    try {
        let {id} = req.params;
        let record = await OrderModel.deleteOne({_id: id});
        return sendSuccessResponse(res, 200, 'Record deleted Successfully')
    } catch(err) {
        return sendErrorResponse(res, 500, 'An Error Occured');
    }
}


recordsInThreeHourDuration = async (dateTimeString) => {
    let findOrderMadeInLast3Hours = await OrderModel.find({datetime: {$gte: new Date(new Date(dateTimeString) - 3*60*60*1000).toISOString()}});
    return findOrderMadeInLast3Hours;
}

const sendSuccessResponse = (res, statusCode, message, data = []) => {
    let jsonObj = {
        status: 'SUCCESS',
        message: message
    }

    if(data.length) jsonObj.data = data
    return res.status(statusCode).json(jsonObj)
}


const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({
        status: "ERROR",
        message: message
    })
}