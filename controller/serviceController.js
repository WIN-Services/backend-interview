const serviceServices = require('../services/ServiceServices')

class serviceController{

    async createServices(req, res){
        const response = await serviceServices.createServices(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
    async getAllServices(req, res){
        const response = await serviceServices.getAllServices(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
    async getService(req, res){
        const response = await serviceServices.getService(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
    async updateService(req, res){
        const response = await serviceServices.updateService(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
    async deleteService(req, res){
        const response = await serviceServices.deleteService(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
}

module.exports = new serviceController()