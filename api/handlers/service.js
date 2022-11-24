const { Service } = require("../../db/models");

const getAllServices = async (req, res) => {
    const ret = {
        error: null,
        data: null
    }
    try {
        const services = await Service.findAll();
        ret["data"] = services.map( service => ({
            id: service.id,
            name: service.name
        }));
        return res.status(200).json(ret);
    }
    catch(err){
        ret["error"] = err
        return res.status(400).json(ret);
    }
}

const createService = async (req, res) => {
    const serviceInfo = req.body;
    const ret = {
        error: null,
        data: null
    }
    try {
        const service = await Service.create({
            name: serviceInfo.name
        })
        ret["data"] = {
            id: service.id,
            name: service.name
        }
        return res.status(200).json(ret);
    }
    catch(err){
        ret["error"] = err
        return res.status(400).json(ret);
    }
}

module.exports = {
    getAllServices,
    createService
}