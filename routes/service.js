const express = require("express");
const router = express.Router();

const serviceHelper = require("../services/service");

const APP_CONSTANTS = require("../constants/application");
const { HTTP_CODES } = APP_CONSTANTS;

router.get("/", async function (req, res) {
    try {
        const results = await serviceHelper.find();
        return res.status(HTTP_CODES.OK).send({
            services: results
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
        const results = await serviceHelper.findOne({ id: req.params.id });
        return res.status(HTTP_CODES.OK).send(results);
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
        const results = await serviceHelper.findByIdAndUpdate(req.params.id, {
            id: req.body.id,
            name: req.body.name
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
        await serviceHelper.create({
            id: req.body.id,
            name: req.body.name
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
        await serviceHelper.delete({ id: req.params.id });
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

module.exports = router;