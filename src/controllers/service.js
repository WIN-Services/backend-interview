const { Service } = require("../models")
/**
 * Fetch All Services API
 * Description: Retrieves a list of services with pagination support.
 * @param {*} req 
 * @param {*} res 
 * @route GET /api/v1/services
 * @queryparam {number} page - The page number for pagination.
 * @queryparam {number} limit - The maximum number of services to return per page.
 */

exports.getAll = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query
        const offset = (page - 1) * limit
        const options = {
            skip: offset,
            limit: parseInt(limit, 10)
        }
        const tasks = await Service.find({}, { "_id": 0 }, options)
        res.json(tasks);

    } catch (error) {
        console.error('Error inserting task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Create Service API
 * Description: Create new Service.
 * @param {*} req 
 * @param {*} res 
 * @route POST /api/v1/service
 */

exports.create = async (req, res) => {
    const { id, name } = req.body;
    const check = await Service.countDocuments({ "$or": [{ "id": id }, { "name": name }] })
    if (check) {
        return res.status(400).json({ "message": "service already exist" });
    } else {
        const service = new Service({ id, name });
        try {
            await service.save();
            return res.status(201).json({ "message": "successfully added" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

/**
 * Update Service API
 * Description: Update Service.
 * @param {*} req 
 * @param {*} res 
 * @route PATCH /api/v1/service
 */

exports.update = async (req, res) => {
    const { name } = req.body;
    const check = await Service.countDocuments({ "name": name })

    if (check) {
        return res.status(400).json({ "message": "service name already exist" });
    }
    const serviceDetails = await Service.findOne({ "id": req.params.id })
    if (!serviceDetails) {
        return res.status(404).json({ "message": "service not exist" });
    }
    try {
        await Service.updateOne({ id: req.params.id }, { "name": name })
        return res.status(200).json({ "message": "successfully updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }


}

/**
 * Fetch service details API
 * Description: Retrieves a service details by id.
 * @param {*} req 
 * @param {*} res 
 * @route GET /api/v1/service/:id
 */

exports.get = async (req, res) => {
    try {
        const serviceDetails = await Service.findOne({ "id": req.params.id })
        if (!serviceDetails) {
            return res.status(404).json({ "message": "service not exist" });
        } else {
            return res.status(200).json({ "message": "found", "details": serviceDetails });
        }

    } catch (error) {
        console.error('Error inserting task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Delete service API
 * Description: Delete a service by id.
 * @param {*} req 
 * @param {*} res 
 * @route DELETE /api/v1/service/:id
 */

exports.delete = async (req, res) => {
    try {
        const serviceDetails = await Service.findOne({ "id": req.params.id })
        if (!serviceDetails) {
            return res.status(404).json({ "message": "service not exist" });
        } else {
            await Service.deleteOne({ "id": req.params.id })
            return res.status(200).json({ "message": "successfully deleted" });
        }

    } catch (error) {
        console.error('Error inserting task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}