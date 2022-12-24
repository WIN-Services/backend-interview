const express = require("express");
const router = express.Router();

const serviceHelper = require("../controllers/service");


router.get("/all", async function (req, res) {
    try {
        const results = await serviceHelper.find();
        return res.status(200).json({
            services: results
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Faliure",
            error: error.message
        });
    }
});

router.get("/:id", async function (req, res) {
    try {
        const results = await serviceHelper.findOne({ id: req.params.id });
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Faliure",
            error: error.message
        });
    }
});

router.put("/update/:id", async function (req, res) {
    try {
        const results = await serviceHelper.findByIdAndUpdate(req.params.id, {
            id: req.body.id,
            name: req.body.name
        });
        return res.status(201).json({
            status: "Success"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Faliure",
            error: error.message
        });
    }
});

router.post("/create", async function (req, res) {
    try {
        await serviceHelper.create({
            id: req.body.id,
            name: req.body.name
        });
        return res.status(201).json({
            status: "Success"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Faliure",
            error: error.message
        });
    }
});

router.delete("/delete/:id", async function (req, res) {
    try {
        await serviceHelper.delete({ id: req.params.id });
        return res.status(200).json({
            status: "Success"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Faliure",
            error: error.message
        });
    }
});

module.exports = router;

module.exports = router;