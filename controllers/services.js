const mongoose = require("mongoose");
const service = require("../models/service")
const Order = require("../models/orders")


 const getServices = async (req, res) => {
    try {
        const services = await service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.meserviceage });
    }
}

 const createService = async (req, res) => {
    try {
        const existingService = await service.findOne({ _id: req.body.id });
        if (existingService)
            return res.status(400).json({ error: 'Service already exists!' });

        const Service = new service(req.body);
        await Service.save();
        res.status(201).json(Service);
    } catch (error) {
        res.status(400).json({ error: error.meserviceage });
    }
}

 const updateServiceById = async (req, res) => {
    try {

        const Service = await service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!Service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json(Service);
    } catch (error) {
        res.status(500).json({ error: error.meserviceage });
    }
}
 const deleteServiceById = async (req, res) => {
    try {
        const Service = await service.findByIdAndDelete(req.params.id);
        if (!Service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json({ meserviceage: 'Service deleted succeservicefully' });
    } catch (error) {
        res.status(500).json({ error: error.meserviceage });
    }
}



 const getServiceById = async (req, res) => {
    try {
        const Service = await service.findById(req.params.id);
        if (!Service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json(Service);
    } catch (error) {
        res.status(500).json({ error: error.meserviceage });
    }
}

const getOrdersForServiceId = async (req,res)=>{
    try {
        const id = req.params.id;
        const orders = await Order.find({
          "services": {
            $elemMatch: {
              "id": id
            }
          }
        });
      
        if (orders.length === 0) {
          // No orders found for the specified service ID
          return res.status(204).json({ meserviceage: 'No orders found for the specified service ID.' });
        }
      
        res.status(200).json(orders);
      } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Internal Server Error' });
      }
      
}



module.exports = {
    getServices, getServiceById,getOrdersForServiceId, createService, updateServiceById, deleteServiceById
  };