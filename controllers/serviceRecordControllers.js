const ServiceModel =  require('./../models/serviceModels')


// This function is used to create service record 
exports.createServiceRecord = async (req, res) => {
    try {
        let body = req.body;
        await ServiceModel.create(body);
        return sendSuccessResponse(res, 200, 'Record Inserted Successfully')
    } catch(err) {
        return sendErrorResponse(res, 500, 'An Error Occured')
    }
}

// This function is used to find serviceRecord with ID 
exports.findServiceRecord = async (req, res) => {
    try {
        let {id} = req.params;
        let records = await ServiceModel.find({_id: id});
        if(records.length>0) {
            return sendSuccessResponse(res, 200, 'Records Found', records)
        } else {
            return sendSuccessResponse(res, 404, 'No Records Found')
        }
    } catch(err) {
        return sendErrorResponse(res, 500, 'An Error Occured')
    }
}


// This function is used to find serviceRecords
exports.findAllServiceRecord = async (req, res) => {
    try {
        let records = await ServiceModel.find({});
        if(records.length>0) {
            return sendSuccessResponse(res, 200, 'Records Found', records)
        } else {
            return sendSuccessResponse(res, 404, 'No Records Found')
        }
    } catch(err) {
        return sendErrorResponse(res, 500, 'An Error Occured')
    }
}

//  This function is used to update the service record
exports.updateServiceRecord = async (req, res) => {
    try {
        let body = req.body;
        let {id} = req.params;
        await ServiceModel.updateOne({_id: id}, body, {
            new:true,
            runValidators:true
        });
        return sendSuccessResponse(res, 200, 'Record Updated Successfully')
    } catch(err) {
        return sendErrorResponse(res, 500, 'An Error Occured')
    }
}


//  This function is used to delete the service record
exports.deleteServiceRecord = async (req, res) => {
    try {
        let {id} = req.params;
        await ServiceModel.deleteOne({_id: id});
        return sendSuccessResponse(res, 200, 'Record deleted Successfully')
    } catch(err) {
        return sendErrorResponse(res, 500, 'An Error Occured')
    }
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