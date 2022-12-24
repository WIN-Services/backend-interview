const express = require("express");
const router = express.Router();

const orderService = require("../controllers/order");


router.get("/all", async function (req, res) {
    try {
        const results = await orderService.find();
        return res.status(200).json({
            orders: results
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            status: "Faliure",
            error: error.message
        });
    }
});

router.get("/:id", async function (req, res) {
    try {
        const result = await orderService.findOne({ id: req.params.id });
        return res.status(200).json(result);
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
        const data= await orderService.findByIdAndUpdate(req.params.id, {
            id: req.body.id,
            datetime: req.body.datetime ? Date.parse(req.body.datetime) : Date.now(),
            totalfee: req.body.totalfee,
            services: req.body.services
        });
        return res.status(201).json({
            status: "Success",
            data:data
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
        const data=await orderService.create({
            id: req.body.id,
            datetime: req.body.datetime ? Date.parse(req.body.datetime) : Date.now(),
            totalfee: req.body.totalfee,
            services: req.body.services
        });
        return res.status(201).json({
            status: "Success",
            data:data
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
        const data=await orderService.delete({ id: req.params.id });
        return res.status(200).json({
            status: "Success",
            data:data
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