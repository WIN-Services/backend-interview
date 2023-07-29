require("dotenv").config();
const jwt = require("jsonwebtoken");
const knexConfig = require('../knexfile.js');
const knex = require('knex')(knexConfig.development);
module.exports = class OrderController {
    static async getSingleOrders(req, res) {
        const orderId = Number(req.params.id);
        try {
            const singleOrder = await knex.raw(`SELECT * FROM orders WHERE id = ?`, [orderId]);
            const { rows } = singleOrder;
            if (rows.length == 0) throw new Error("Order with given id is not found.")
            res.status(200).json(rows[0]);
        } catch (error) {
            console.error(error.stack);
            res.status(404).json({ message: error.message });
            return;
        }
    }

    static async addOrder(req, res) {
        const { totalfee, services } = req.body;
        try {
            if (!req.body) {
                res.status(400).json("Empty Body Params");
                return;
            }

            if (!services || !totalfee) {
                res.status(400).json("Missing Payload");
                return;
            }
            const latestOrder = await knex.raw("Select * from orders where userid = ? order by datetime desc limit 1", [req.info.userDetails.id]);
            if (latestOrder.rows.length > 0) {
                const threeHourDifference = new Date() - new Date(latestOrder.rows[0].datetime);
                const threeHoursInMilliseconds = 3 * 60 * 60 * 1000;
                if (threeHourDifference <= threeHoursInMilliseconds) {
                    res.status(400).json({ message: "Cannot add another order from the same user within 3 hours. Please try after sometime" });
                    return;
                }
            }
            const user = req.info.userDetails.id;
            const resultData = await knex.raw("INSERT INTO orders (userid,totalfee,service,datetime) VALUES (?,?,?,?)", [user, totalfee, services, new Date()]);
            const { rows } = resultData;
            res.status(200).json({ message: "Order added successfully." });
        } catch (error) {
            console.error(error.stack);
            res.status(400).json("Invalid Request");
            return;
        }
    }

    static async getAllOrders(req, res) {
        const allOrders = await knex.raw(`SELECT * FROM orders`);
        try {
            const { rows } = allOrders
            if (rows.length === 0) {
                throw new Error("Zero(0) order stats found at moment. Please order something.")
            }
            res.status(200).json(rows);
        } catch (error) {
            console.error(error.stack);
            res.status(400).json(error.message);
            return
        }
    }


    static async updateOrder(req, res) {
        const updateOrderId = Number(req.params.id);
        const { datetime, totalfee, services } = req.body;
        try {
            if (!req.body) {
                res.status(400).json("Empty Body Params");
                return;
            }
            if (!req.body.id || req.body.id !== updateOrderId) {
                throw new Error("Missing Order Id in Payload or mismatch in order id");
            }


            const orderToBeUpdated = await knex.raw("Select userId from orders where id = ?", [updateOrderId]);
            if (orderToBeUpdated.rows.length === 0) {
                throw new Error("No such order exists");
            }

            if (orderToBeUpdated.rows[0].userid !== req.info.userDetails.id && !req.info.isAdmin) {
                throw new Error("Requesting user cannot update this order");
            }
            else {
                const updatedOrder = await knex.raw("UPDATE orders SET datetime = ?, totalfee = ?, service =? WHERE id = ?", [datetime, totalfee, services, updateOrderId]);
                const { rows } = updatedOrder;
                res.status(200).json({ message: "Order updated successfully", data: rows[0] });
            }
        } catch (error) {
            console.error(error.stack);
            res.status(400).json({ message: error.message });
        }
    }


    static async deleteOrder(req, res) {
        const orderId = Number(req.body.id);

        if (!req.body) {
            res.status(400).json("Empty Body Params");
            return;
        }
        try {
            const orderToBeDeleted = await knex.raw("Select userId from orders where id = ?", [orderId]);

            if (orderToBeDeleted.rows.length === 0) {
                throw new Error("No such order exists");
            }

            if (orderToBeDeleted.rows[0].userid !== req.info.userDetails.id && !req.info.isAdmin) {
                throw new Error("Requesting user cannot delete this order");
            }
            const deletedRecord = await knex.raw("DELETE FROM orders WHERE id = ?", [orderId]);
            res.status(200).json({ message: "Order deleted successfully" });
        } catch (error) {
            console.error(error.stack);
            res.status(400).json({ message: error.message });
        }
    }
}

