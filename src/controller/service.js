import { Router } from 'express';
import { ServiceRecord } from '../database/schema.js';
import { validateCreateService } from '../middleware/order.js';

const router = Router();

router.post('/', validateCreateService, async (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) {
        return res.status(400).json({ error: "Both 'id' and 'name' are required." });
    }

    try {
        const existingService = await ServiceRecord.findOne({ id });

        if (existingService) {
            return res.status(400).json({ error: "Service record with the same id already exists." });
        }

        const newServiceRecord = new ServiceRecord({ id, name });
        await newServiceRecord.save();

        res.status(201).json(newServiceRecord);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const serviceRecords = await ServiceRecord.find();
        res.status(200).json(serviceRecords);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const serviceRecord = await ServiceRecord.findOne({ id });

        if (!serviceRecord) {
            return res.status(404).json({ error: "Service record not found." });
        }

        res.status(200).json(serviceRecord);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;