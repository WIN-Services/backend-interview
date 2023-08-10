const Order = require('./orderModel');
const Service = require('../services/serviceModel');

exports.checkUserPermission = ( ...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.body.user.role)) {
            res.status(403)
            .json({message: 'You do not have permission to perform this action'});
            return;
        }
        next();
      };
};

exports.canUserCreateOrder = async (req, res, next) => {
    try {
        const threeHoursAgo = new Date();
        threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);
    
        const orders = await Order.find({
            createdAt: { $gte: threeHoursAgo }
        });
    
        if (orders.length > 0) {
            res.status(403)
            .json({message: 'Last Order was created in Less than 3 Hours'});
            return;
        }
        next();
    } catch (err) {
        res.status(400)
        .json({ message: err.message }); 
        return;
    }
};

exports.computeOdersTotalFee = async (req, res, next) => {
    try {
        const services = req.body.services;
        let totalfee = 0;
        for (const serviceId of services) {
            const oldService = await Service.findById(serviceId);
            if (! oldService) {
                res.status(404)
                .json({message: `Service with id - ${serviceId} Not Found`});
            }
            totalfee += oldService.price;
        };
        req.body.totalfee = totalfee;
        next();
    } catch (err) {
        res.status(400)
        .json({ message: err.message }); 
        return;
    }
};

exports.createOrder = async (req, res, next) => {
    try {
        const createOrderPayload = {
            services: req.body.services,
            totalfee: req.body.totalfee,
        };
    
        const order = await Order.create(createOrderPayload);
        res.status(200)
        .json(order);
    } catch (err) {
        res.status(400)
        .json({ message: err.message }); 
        return;
    }
};

exports.fetchAllOrders = async (req, res, next) => {
    try {
        const page = req.params.page;
        const limit = req.params.limit;
        const offset = (page - 1) * limit;
    
        const orders = await Order.find({}).populate('services').skip(offset).limit(limit);
    
        res.status(200)
        .json(orders);
    } catch (err) {
        res.status(400)
        .json({ message: err.message }); 
        return;
    }
};

exports.updateOrderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id);
        if (!order) {
            res.status(404)
            .json({message: `Order with id - ${id} Not Found`});
            return;
        }
    
        order.services = req.body.services;
        order.totalfee = req.body.totalfee;
        const updatedOrder = await order.save();
    
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(400)
        .json({ message: err.message }); 
        return;
    }
};

exports.fetchOrderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id).populate('services');
        if (!order) {
            res.status(404)
            .json({message: `Order with id - ${id} Not Found`});
            return;
        }
    
        res.status(200).json(order);
    } catch (err) {
        res.status(400)
        .json({ message: err.message }); 
        return;
    }
};

exports.deleteOrderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id);
        if (!order) {
            res.status(404)
            .json({message: `Order with id - ${id} Not Found`});
            return;
        }
    
        await Order.findByIdAndDelete(id);
    
        res.status(200).json({message: `Order with id ${id} Deleted`});
    }  catch (err) {
        res.status(400)
        .json({ message: err.message }); 
        return;
    }
};