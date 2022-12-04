const express = require("express");
const router = express.Router();

const orderService = require("../services/order");

const APP_CONSTANTS = require("../constants/application");
const { HTTP_CODES } = APP_CONSTANTS;

router.get("/", async function (req, res) {
    try {
        const results = await orderService.find();
        return res.status(HTTP_CODES.OK).send({
            orders: results
        });
    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
            status: "Faliure",
            error: error.message
        });
    }
});

router.get("/:id", async function (req, res) {
    try {
        const result = await orderService.findOne({ id: req.params.id });
        return res.status(HTTP_CODES.OK).send(result);
    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
            status: "Faliure",
            error: error.message
        });
    }
});

router.put("/:id", async function (req, res) {
    try {
        await orderService.findByIdAndUpdate(req.params.id, {
            id: req.body.id,
            datetime: req.body.datetime ? Date.parse(req.body.datetime) : Date.now(),
            totalfee: req.body.totalfee,
            services: req.body.services
        });
        return res.status(HTTP_CODES.CREATED).send({
            status: "Success"
        });
    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
            status: "Faliure",
            error: error.message
        });
    }
});

router.post("/", async function (req, res) {
    try {
        await orderService.create({
            id: req.body.id,
            datetime: req.body.datetime ? Date.parse(req.body.datetime) : Date.now(),
            totalFee: req.body.totalFee,
            services: req.body.services
        });
        return res.status(HTTP_CODES.CREATED).send({
            status: "Success"
        });
    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
            status: "Faliure",
            error: error.message
        });
    }
});

router.delete("/:id", async function (req, res) {
    try {
        await orderService.delete({ id: req.params.id });
        return res.status(HTTP_CODES.OK).send({
            status: "Success"
        });
    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
            status: "Faliure",
            error: error.message
        });
    }
});

module.exports = router;