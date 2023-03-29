const Mongoose = require('mongoose');
const Validator = require('validatorjs');
const Orders_model=require('../models/orders.model')
const ResponseCodes = require('../middleware/response-code');
var response_code = new ResponseCodes();
var server_status = response_code.serverError().status;
var server_unavailable_status = response_code.serverUnavailable().status;
var data_status = response_code.dataNotFound().status;
var request_status = response_code.badRequest().status;
var access_status = response_code.forbidden().status;
var auth_status = response_code.unauthorized().status;
var success_status = response_code.success().status;

module.exports= {
    getOrders(req,res){
        Orders_model.find({})
                .then((orders)=>{
                    response_code.message="Orders fetched successfully";
                    response_code.data=orders;
                    res.status(success_status).send(response_code.success());
                })
                .catch((err)=>{
                    response_code.error = {
                        'message':{...err}
                    }
                    res.status(server_status).send(response_code.serverError());
                })
    },
    getOrderById(req,res){
        let order_id=req.params?.order_id;

        let data= {
            order_id
        }
        let rules = {
            order_id:'required'
        }
    
        let validation = new Validator(data, rules);
    
        if(!validation.passes()){
            response_code.error = {
                'message':{...validation.errors.errors}
            }
            res.status(request_status).send(response_code.badRequest());
        }else{
            Orders_model.find({id:order_id})
                .then((order)=>{
                    response_code.message="Order fetched successfully";
                    response_code.data=order;
                    res.status(success_status).send(response_code.success());
                })
                .catch((err)=>{
                    response_code.error = {
                        'message':{...err}
                    }
                    res.status(server_status).send(response_code.serverError());
                })
        }
        
    }
}