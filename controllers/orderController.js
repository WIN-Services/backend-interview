const Order = require("../models/orderModel");


async function checkDate(dateTime) {
    try{
        let currentDate = new Date();
        if(currentDate.getTime() - dateTime.getTime() < 3600000){
            return false;
        }
        return true;

    } catch (error) {
        throw (error);
    }
}

exports.createOrder = async (req, res) => {
    try {
        if (req.body.service_id == null || req.body.totalfee == null ) {
            return res.status(400).json({ message: "Bad Request", data: null });
        }

        const preExistOrder = await Order.findOne({ services : {$in : [req.body.service_id]} }).lean().exec();
        if(preExistOrder != null){
            const checker = await checkDate(preExistOrder.datetime);
            if(!checker){
                return res.status(405).json({ message: "More Orders cannot be placed within 3 hrs of pre-existing order", data: null });
            }
        }
       
        const order = await Order.create({
            totalfee: req.body.totalfee,
            services: req.body.service_id,
        });
        res.status(201).json({ status: true, message: "Order Created Successfully", data: order });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: "Some Technical Issue", data: null });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        let limit = req.query.limit ? Number(req.query.limit) : 10;
        let page = req.query.page ? Number(req.query.page) : 0;
        let skip = page * limit;

        const orders = await Order.find().limit(limit).skip(skip).lean().exec();
        res.status(200).json({ status: true, message: 'Orders loaded successfully', data: orders });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: "Some Technical Issue", data: null });
    }

}

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).lean().exec();
        res.status(200).json({ status: true, message: "Order loaded successfully", data: order });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: "Some Technical Issue", data: null });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        if (req.body.service_id == null ) {
            return res.status(400).json({ message: "Bad Request", data: null });
        }
        
        const preExistOrder = await Order.findOne({ services : {$in : [req.body.service_id]} }).lean().exec();
        if(preExistOrder != null){
            const checker = await checkDate(preExistOrder.datetime);
            if(!checker){
                return res.status(405).json({ message: "More Orders cannot be placed within 3 hrs of pre-existing order", data: null });
            }
        }
        
        const updatedData = await Order.findOne({ _id : req.params.id });
        if(updatedData == null){
            return res.status(400).json({ message: "No Order found", data: null });
        }
        updatedData.datetime = req.body.datetime;
        updatedData.totalfee = req.body.totalfee;
        updatedData.services = req.body.services;
        await updatedData.save();

        res.status(200).json({ status: true, message: "Order Updated Successfully", data: updatedData });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: "Some Technical Issue", data: null });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: true, message: "Order Deleted Successfully", data: order });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: "Some Technical Issue", data: null });
    }
};

