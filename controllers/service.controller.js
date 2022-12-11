const Service = require("../models/service.model");

/*
 * @route - GET api/service/:id
 * @description - get service
 */
getService = async (req, res) => {
    try {
        // validate request
        if (!req.params || !req.params.id) {
            return res.status(400).json({
                message: "Bad Request",
                data: null,
            });
        }
        // get service by Id
        const service = await Service.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Service fetched successfully",
            data: service,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }
};

/*
 * @route - POST api/service
 * @description - create Orders
 */
createService = async (req, res) => {
    try {
        // validate request
        if (!req.body || !req.body.name) {
            return res.status(400).json({
                message: "Bad Request",
                data: null,
            });
        }
        let service = await Service.create(req.body);
        res.status(201).json({
            success: true,
            message: "Service Created Successfully",
            data: service,
        });
    } catch (error) { }
};

/*
 * @route - PUT api/service/:id
 * @description - update service
 */
updateService = async (req, res) => {
    if (!req.params || !req.params.id) {
        return res.status(400).json({
            message: "Bad Request",
            data: null,
        });
    }

    //update servie
    const order = {
        name: req.body.name
    };
    const updatedService = await Service.findByIdAndUpdate(req.params.id, order, { upsert: true });
    res.status(200).json({
        success: true,
        message: "Service Updated Successfully",
        data: updatedService,
    });
}

/*
 * @route - DELETE api/service/:id
 * @description - delete service
 */
deleteService = async (req, res) => {
    try {
        // validate request
        if (!req.params || !req.params.id) {
            return res.status(400).json({
                message: "Bad Request",
                data: null,
            });
        }
        //delete service
        const service = await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Service Deleted Successfully",
            data: service,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }
};

/*
 * @route - GET api/service/
 * @description - get all services
 */
getAllServices = async (req, res) => {
    try {
        // set skip and limit values
        let limit = 100;
        let skip = 0;
        limit = req.query.limit ? Number(req.query.limit) : limit;
        skip = req.query.skip ? Number(req.query.skip) : skip;

        //get all services
        const services = await Service.find().limit(limit).skip(skip);
        res.status(200).json({
            success: true,
            message: 'Services fetched successfully',
            data: services,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }

}


module.exports = { getService, createService, updateService, deleteService, getAllServices };
