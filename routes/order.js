const express = require('express')
const router = express.Router()
const Order = require('../models/order_model')

router.post('/', async (req, res) => {
    try {
        const { id, totalfee, services } = req.body;

        const threeHoursAgo = new Date();
        threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

        const existingOrder = await Order.findOne({
            datetime: { $gte: threeHoursAgo },
        });

        if (existingOrder) {
            return res.status(400).json({ error: 'An order was created within the last 3 hours' });
        }

        const order = new Order({ id, totalfee, services });
        await order.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', stack: error });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findOne({ id: req.params.id })

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', stack: error });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const updates = req.body;

        const updatedOrder = await Order.findOneAndUpdate({ id: orderId }, updates, {
            new: true
        });

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', stack: error });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const orderId = req.params.id;

        const deletedOrder = await Order.findOneAndDelete({ id: orderId });

        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(deletedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', stack: error });
    }
})

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', stack: error });
    }
})


module.exports = router