const express = require('express')
const router = express.Router()
const Service = require('../models/service_model')

router.post('/', async (req, res) => {
    try {
        const { id, name } = req.body;

        if (!id || !name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const service = new Service({ id, name });
        await service.save();

        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', stack: error });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findOne({ id: req.params.id })

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json(service);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', stack: error });
    }
})

module.exports = router