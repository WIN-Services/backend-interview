const {Order } = require("../models")
/**
 * Fetch All Orders API
 * Description: Retrieves a list of orders with pagination support.
 * @param {*} req 
 * @param {*} res 
 * @route GET /api/v1/orders
 * @queryparam {number} page - The page number for pagination.
 * @queryparam {number} limit - The maximum number of orders to return per page.
 */

exports.getAll = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query
        const offset = (page - 1) * limit
        const options = {
            skip: offset,
            limit: parseInt(limit, 10)
        }
        const orders = await Order.find({}, { "_id": 0 }, options)
        res.json(orders);

    } catch (error) {
        console.error('Error inserting task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Create Order API
 * Description: Create new Order.
 * @param {*} req 
 * @param {*} res 
 * @route POST /api/v1/order
 */

exports.create = async (req, res) => {
    const { id, totalfee, services } = req.body;
    const check = await Order.countDocuments({ "id": id })

    if (check) {
        return res.status(400).json({ "message": "order already exist" });
    } else {
        const order = new Order({ id, totalfee, services });
        try {
            await order.save();
            return res.status(201).json({ "message": "successfully ordered" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

/**
 * Update Order API
 * Description: Update Order.
 * @param {*} req 
 * @param {*} res 
 * @route PATCH /api/v1/order
 */

exports.update = async (req, res) => {
    const { totalfee, services } = req.body;
    const orderDetails = await Order.findOne({ "id": req.params.id })
    if (!orderDetails) {
        return res.status(404).json({ "message": "order not exist" });
    }
    try {
        await Order.updateOne({ id: req.params.id }, { "totalfee": totalfee , "services" : services })
        return res.status(200).json({ "message": "successfully updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }


}

/**
 * Fetch order details API
 * Description: Retrieves a order details by id.
 * @param {*} req 
 * @param {*} res 
 * @route GET /api/v1/order/:id
 */

exports.get = async (req, res) => {
    try {
        const orderDetails = await Order.findOne({ "id": req.params.id })
        if (!orderDetails) {
            return res.status(404).json({ "message": "order not exist" });
        } else {
            return res.status(200).json({ "message": "found", "details": orderDetails });
        }

    } catch (error) {
        console.error('Error inserting task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Delete order API
 * Description: Delete a order by id.
 * @param {*} req 
 * @param {*} res 
 * @route DELETE /api/v1/order/:id
 */

exports.delete = async (req, res) => {
    try {
        const orderDetails = await Order.findOne({ "id": req.params.id })
        if (!orderDetails) {
            return res.status(404).json({ "message": "order not exist" });
        } else {
            await Order.deleteOne({ "id": req.params.id })
            return res.status(200).json({ "message": "successfully deleted" });
        }

    } catch (error) {
        console.error('Error inserting task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}