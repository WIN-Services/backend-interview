const Service = require('../models/serviceModel')

const mongoose = require('mongoose')

//Get all services
const getServices = async (req, res) => {
    const services = await Service.find({}).sort({createdAt: -1})
    return res.status(200).json(services)
}

// GET a single service
const getService = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Service Found with this ID'})
    }

    const service = await Service.findById(id)

    if(!service) {
        return res.status(404).json({error: 'No Service Found with this Order ID'})
    }

    res.status(200).json(service)
}

//CREATE a service
const createService = async (req, res) => {
    const {id,name} = req.body

    try{
        const service = await Service.create({id,name})
        res.status(200).json(service)
    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

//DELETE a service
const deleteService = async (req, res) => {
    const {id} = req.params

    const service = await Service.findOneAndDelete({id:id})

    if(!service) {
        return res.status(400).json({error:'No such Service Found'})
    }

    res.status(200).json(service)
}


//UPDATE a service
const updateService = async (req,res) => {
    const {id} = req.params

    const service = await Service.findOneAndUpdate({id:id},{
        ...req.body
    })

    if(!service) {
        return res.status(400).json({error:'No such Service Found'})
    }
    res.status(200).json(service)
}

module.exports = {
    getServices,
    getService,
    createService,
    deleteService,
    updateService
}
