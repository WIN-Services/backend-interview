const Service = require("../models/serviceModel");


exports.createService = async (req, res) => {
    try {
        await Service.create({
            name: req.body.name
        });
        return res.status(201).json({ status: true });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false });
    }
};

exports.getAllService = async (req, res) => {
    try {
        let limit = req.query.limit ? Number(req.query.limit) : 10;
        let page = req.query.page ? Number(req.query.page) : 0;
        let skip = page * limit;

        const data = await Service.find().limit(limit).skip(skip).lean().exec();
        return res.status(200).json({ services: data });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false });
    }
};

exports.getSingleService = async (req, res) => {
    try {
        const data = await Service.findOne({ _id: req.params.id }).lean().exec();
        return res.status(200).json(data);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false });
    }
};

exports.updateService = async (req, res) => {
    try {
        await Service.updateOne( 
        { _id : req.params.id },
        {
            $set : { name: req.body.name }
        });
        return res.status(202).json({ status: true });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false });
    }
};

exports.deleteService = async (req, res) => {
    try {
        await Service.deleteOne({ _id: req.params.id });
        return res.status(200).json({ status: true });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false });
    }
};