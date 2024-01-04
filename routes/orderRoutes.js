const express = require('express');
const router = express.Router();
const db = require("../models");

// Function to check for orders within 3 hours
async function isorderWithinThreeHours(datetime) {
    const threehoursBefore = new Date(datetime);
    threehoursBefore.setHours(threehoursBefore.getHours() - 3);
    
    const threehoursAfter = new Date(datetime);
    threehoursAfter.setHours(threehoursAfter.getHours() + 3);

    const orders = await db.Order.findAll({
        where: {
            datetime: {
                [db.Sequelize.Op.between]: [threehoursBefore, threehoursAfter]
            }
        }
    });

    return orders.length > 0;
}

// POST /orders (Create Order)
router.post('/', async (req, res) => {
    const { datetime, totalfee, services } = req.body;
    try {
        if(await isorderWithinThreeHours(datetime)) {
            return res.status(400).send('An order already exists within 3 hours of the specified time.');
        }

        const newOrder = await db.Order.create({ datetime, totalfee });
        const servicePromises = services.map(serviceId => 
            db.Service.findByPk(serviceId).then(service => newOrder.addService(service))    
        );
        await Promise.all(servicePromises);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).send('Error creating order: ' + err.message);
    }
});

// GET /orders (Get All Orders)
router.get('/', async (req, res) => {
    try {
        const orders = await db.Order.findAll({
            include: [db.Service]
        });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).send('Error fetching orders: ' + err.message);
    }
})

// GET /orders/:id (Get Single Order)
router.get('/:id', async (req, res) => {
    try {
        const order = await db.Order.findByPk(req.params.id, {
            include: [db.Service]
        });
        if(!order) {
            return res.status(404).send('Order not found');
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).send('Error fetching order: ' + err.message);
    }
});

// PUT /orders/:id (Update order)
router.put('/:id', async (req, res) => {
    const orderId = req.params.id;
    const { datetime, totalfee } = req.body;
    try {
        if(await isorderWithinThreeHours(datetime)) {
            return res.status(400).send('An order already exists within 3 hours of the specified time.');
        }

        const order = await db.Order.findByPk(req.params.id);
        if(!order) {
            return res.status(404).send('Order not found');
        }

        const { datetime, totalfee } = req.body;
        await order.update({ datetime, totalfee });
        res.status(200).send('Order updated');
    } catch (err) {
        res.status(500).send('Error updating order: ' + err.message);
    }
});

// DELETE /orders/:id (Delete Order)
router.delete('/:id', async (req, res) => {
    try {
        const order = await db.Order.findByPk(req.params.id);
        if(!order) {
            return res.status(404).send('Order not found');
        }

        await order.destroy();
        res.status(200).send('Order deleted');
    } catch (err) {
        res.status(500).send('Error deleting order: ' + err.message);
    }
});

module.exports = router;