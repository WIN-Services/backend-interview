const Mongoose = require('mongoose');
const Validator = require('validatorjs');
const ResponseCodes = require('../middleware/response-code');
const Orders_model=require('../models/orders.model')
var response_code = new ResponseCodes();
var server_status = response_code.serverError().status;
var server_unavailable_status = response_code.serverUnavailable().status;
var data_status = response_code.dataNotFound().status;
var request_status = response_code.badRequest().status;
var access_status = response_code.forbidden().status;
var auth_status = response_code.unauthorized().status;
var success_status = response_code.success().status;

module.exports= {
    createOrder(req,res){
        let id=req.body?.id;
        let totalfee=req.body?.totalfee;
        let services=req.body?.services;
        
        let data= {
            id,
            totalfee,
            services
        }
        let rules = {
            id:'required|string|min:2',
            totalfee:'required',
            services:'required'
        }
    
        let validation = new Validator(data, rules);
    
        if(!validation.passes()){
            response_code.error = {
                'message':{...validation.errors.errors}
            }
            res.status(request_status).send(response_code.badRequest());
        }else{
            var new_order=new Orders_model(data);
            new_order.save().then((result)=>{
                response_code.message="Order created successfully";
                    response_code.data=result;
                    res.status(success_status).send(response_code.success());
            }).catch((err)=>{
                response_code.error = {
                    'message':{...err}
                }
                res.status(server_status).send(response_code.serverError());
            })
        }
    },

    updateOrder(req,res){
        let id=req.body?.id;
        let totalfee=req.body?.totalfee;
        let services=req.body?.services;
        
        let data= {
            id,
            totalfee,
            services
        }

        let rules = {
            id:'required|string|min:2',
            totalfee:'required',
            services:'required'
        }
        
        let validation = new Validator(data, rules);
    
        if(!validation.passes()){
            response_code.error = {
                'message':{...validation.errors.errors}
            }
            res.status(request_status).send(response_code.badRequest());
        }else{      
            Orders_model.updateOne({id:id},{$set:{
                totalfee:totalfee,
                services:services
            }},{upsert:true})
            .then((order)=>{
                response_code.message="Order updated successfully";
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
    },

    deleteOrder(req,res){
            let order_id=req.params?.order_id;
            let data= {
                order_id
            }
            let rules = {
                order_id:'required|alpha_num'
            }
        
            let validation = new Validator(data, rules);
        
            if(!validation.passes()){
                response_code.error = {
                    'message':{...validation.errors.errors}
                }
                res.status(request_status).send(response_code.badRequest());
            }else{      
                Orders_model.deleteOne({id:order_id})
                .then((order)=>{
                    response_code.message="Order deleted successfully";
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