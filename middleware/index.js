const { response } = require("../config/response");
const { existingOrderCheckDB } = require("../controllers/dbController");
const moment = require('moment');

const paramIdValidator = async (req,res,next) => {
    try{
        console.log("paramIdValidator");
        let orderId = req.params.id;
        if(!orderId) throw "No OrderId Found";
        if(isNaN(orderId)) throw "Invalid OrderId";
        next();
    }catch(err){
        if(err.message) err = err.message;
        response(400,err,{},res);
    }
}

const validateOrderRequest = async (req, res, next) => {
    try {
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const acceptedTime = moment().subtract(3, 'hours').format('YYYY-MM-DD HH:mm:ss');
        const exists = await existingOrderCheckDB(currentTime, acceptedTime);
        if (exists) throw "Can't create or update order right now. Try Again Later!"
        next();
    } catch (err) {
        if (err.message) err = err.message;
        console.log("validateOrderRequest error", err);
        response(400, err, {}, res);
    }
}

module.exports = {
    paramIdValidator,
    validateOrderRequest
}