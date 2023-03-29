const Mongoose = require('mongoose');;
const ResponseCodes = require('../middleware/response-code');
const Orders_model=require('../models/orders.model');
const Services_model=require('../models/services.model')
const {orders,services}=require('./orders')
var response_code = new ResponseCodes();
var server_status = response_code.serverError().status;
var server_unavailable_status = response_code.serverUnavailable().status;
var data_status = response_code.dataNotFound().status;
var request_status = response_code.badRequest().status;
var access_status = response_code.forbidden().status;
var auth_status = response_code.unauthorized().status;
var success_status = response_code.success().status;


module.exports = {
   async migrateDB(req,res){
        let orders_promises=[];
        orders.map(async(order)=>{
            let new_order=new Orders_model(order);
            let response=await new_order.save();
            orders_promises.push(response); 
        })
        let services_pormises=[];
        services.map(async(service)=>{
            let new_service=new Services_model(service);
            let response=await new_service.save();
            services_pormises.push(response); 
        })
        let promises=orders_promises.concat(services_pormises);
        Promise.all(promises).then((data)=>{
            console.log("Data saved sucessully");
            response_code.message="Data saved sucessully";
            response_code.data=data;
             res.status(success_status).send(response_code.success());
        }).catch((err)=>{
            console.log("Error");
            response_code.message="Error migrating DB, please try again"
            response_code.error=err;
             res.status(server_status).send(response_code.serverError());
        })
    }
}