const { response } = require("../config/response");

const paramIdValidator = async (req,res,next) => {
    try{
        console.log("paramIdValidator");
        let orderId = req.params.id;
        if(!orderId) throw "No OrderId Found";
        if(isNaN(orderId)) throw "Invalid OrderId";
        next();
    }catch(error){
        if(error.message) error = error.message;
        response(400,error,{},res);
    }
}

module.exports = {
    paramIdValidator
}