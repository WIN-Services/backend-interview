import { Router } from 'express';
import { Order, ServiceRecord } from '../database/schema.js';
import { validateCreateOrder } from '../middleware/order.js';

const router = Router();

router.post('/', validateCreateOrder, async (req, res) => {
    try {
        const threeHours = new Date(new Date() - 3 * 60 * 60 * 1000);

        const existingOrder = await Order.findOne({
            datetime: {
                $lt: threeHours,
            },
        });

        if (existingOrder) {
            return res.status(400).json({
                error: 'Order creation is not allowed within 3 hours of a pre-existing order',
            });
        }

        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data or conflict with an existing order' });
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    const serviceObj = {};

    let order = await Order.findById(req.params.id);
    const service = await ServiceRecord.find();

    service.forEach(e => {
        serviceObj[e.id] = e.name;
    });

    order = { ...order._doc, services: order.services.map(e => ({ id: e.id, name: serviceObj[e.id] })) };

    res.json(order);
});

router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
