const Order = require('../models/order.model');
const Service = require('../models/service.model');

async function getAllOrders(req, res) {
  try {
    let orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getOrderById(req, res) {
  try {
    let orderId = req.params.id;
    let order = await Order.findById(orderId);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: `Order ${orderId} not found!` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createOrder(req, res) {
    try {
        let newOrderData = req.body;

        if(!newOrderData.services) {
            return res.status(400).json({ error: 'Bad Request' });
        }
        else {
            // Check if there's any order created or updated within the last 3 hours
            let lastOrder = await Order.findOne({}, {}, { sort: { updatedAt: -1 } });

            if (lastOrder && new Date() - lastOrder.updatedAt < 3 * 60 * 60 * 1000) {
                return res.status(400).json({ error: 'Cannot create an order within 3 hours of the last order update' });
            }

            let totalFee = 0;

            for (let service of newOrderData.services) {
                let serviceData = await Service.findOne({ $or: [{ name: service }, { id: service }] });
                if (!serviceData) {
                    return res.status(400).send(`${service} service not available!`);
                } else {
                    totalFee += serviceData.fee;
                }
            }
            let newOrder = new Order({ ...newOrderData, totalfee: totalFee });
            await newOrder.save();
            return res.status(201).json({ message: 'Order created successfully', order: newOrder });

        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function updateOrder(req, res) {
  try {
    let orderId = req.params.id;
    let updatedOrderData = req.body;

     // Check if there's any order created or updated within the last 3 hours
     const lastOrder = await Order.findOne({}, {}, { sort: { updatedAt: -1 } });

     if (lastOrder && new Date() - lastOrder.updatedAt < 3 * 60 * 60 * 1000) {
       return res.status(400).json({ error: 'Cannot update an order within 3 hours of the last order update' });
     }

    let totalFee = 0;

    for (let service of updatedOrderData.services) {
        let serviceData = await Service.findOne({ $or: [{ name: service }, { id: service }] });
        if (!serviceData) {
            return res.status(400).send(`${service} service not available!`);
        } else {
            totalFee += serviceData.fee;
        }
    }

    let result = await Order.findByIdAndUpdate(orderId, { ...updatedOrderData, totalfee: totalFee });
    if (result) {
      res.status(201).json({ message: `Order ${orderId} updated successfully!`, order: result });
    } else {
      res.status(404).json({ error: `Order ${orderId} not found!` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteOrder(req, res) {
  try {
    let orderId = req.params.id;
    let result = await Order.findByIdAndDelete(orderId);
    if (result) {
      res.status(200).json({ message: `Order ${orderId} deleted successfully!` });
    } else {
      res.status(404).json({ error: `Order ${orderId} not found!` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { 
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
