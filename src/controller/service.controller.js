
require("dotenv").config();

const { errorHandler } = require("../helper/status");
const {
    addService,getAllService
} = require("../services/service.services");


exports.addService = async (req, res) => {
    try {
        const resp = await addService(req.body);
        return res.status(resp.status || 201).json(resp);

    } catch (err) {
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong, err });
    }
};

exports.getAllService = async (req, res) => {
    try {
        const resp = await getAllService(req.body);
        return res.status(resp.status || 200).json(resp);

    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong, err });
    }
};

