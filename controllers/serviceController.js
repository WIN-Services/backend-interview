const serviceService = require('../services/serviceService');

const serviceController = {
    createService: async (req, res) => {
        try {
            const result = await serviceService.createService(req.body);
            res.status(result.statusCode).json(result);

        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    },
    getService: async (req, res) => {
        try {
            const result = await serviceService.getService(req.params.id);
            res.status(result.statusCode).json(result);

        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllServices: async (req, res) => {
        try {
            const result = await serviceService.getAllServices();
            res.status(result.statusCode).json(result);

        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateService: async (req, res) => {
        try {
            const serviceId = req.params.id;
            
            const result = await serviceService.updateService(serviceId, req.body);
            res.status(result.statusCode).json(result);

        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteService: async (req, res) => {
        try {
            const serviceId = req.params.id;
        
            const result = await serviceService.deleteService(serviceId);
            res.status(result.statusCode).json(result);

        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = serviceController;

