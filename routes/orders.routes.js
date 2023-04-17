const orderRouter = require("express").Router();
const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "admin",
  port: 5432,
});

//GET ORDER BY ID
orderRouter.get("/order/:id", async (req, res) => {
  const orderId = Number(req.params.id);
  const query = `SELECT * FROM orders WHERE id = ${orderId}`;
  try {
    await client.connect();
    const { rows } = await client.query(query);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error.stack);
    res.status(400).json("Not Found");
  } finally {
    await client.end();
  }
});

//GET ALL ORDERS
orderRouter.get("/orders", async (req, res) => {
  const query = `SELECT * FROM orders`;
  try {
    await client.connect();
    const { rows } = await client.query(query);
    res.status(200).json(rows.map((row) => row));
  } catch (error) {
    console.error(error.stack);
    res.status(400).json("Not Found");
  } finally {
    await client.end();
  }
});

//ADD AN ORDER
orderRouter.post("/order", async (req, res) => {
  const query = `INSERT INTO orders ("datetime","totalfee","serviceid","service") VALUES (${datetime},${Number(
    req.body[0].totalfee
  )},${req.body[0].serviceid},${req.body[0].services})`;
  try {
    await client.connect();

    if (!req.body) {
      res.status(400).json("Empty Body Params");
      return;
    }

    if (!req.body[0].serviceid || !req.body[0].totalfee) {
      res.status(400).json("Missing Payload");
      return;
    }
    const { rows } = await client.query(query);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error.stack);
    res.status(400).json("Invalid Request");
  } finally {
    await client.end();
  }
});

//UPDATE AN ORDER
orderRouter.put("/order/:id", async (req, res) => {
  const updateOrderId = Number(req.params.id);
  const query = `UPDATE orders SET datetime = ${req.body.datetime}, totalfee = ${req.body.totalfee}, serviceid = ${req.body.serviceid}, service = ${req.body.services} WHERE id = ${updateOrderId}`;
  try {
    await client.connect();

    if (!req.body) {
      res.status(400).json("Empty Body Params");
      return;
    }

    if (!req.body.id) {
      res.status(400).json("Missing Order Id in Payload");
      return;
    }
    const { rows } = await client.query(query);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error.stack);
    res.status(400).json("Invalid Request");
  } finally {
    await client.end();
  }
});

//DELETE AN ORDER
orderRouter.delete("/order", async (req, res) => {
  const orderId = Number(req.body.id);
  const query = `DELETE FROM orders WHERE id = ${orderId}`;
  try {
    await client.connect();
    const { rows } = await client.query(query);
    if (!req.body) {
      res.status(400).json("Empty Body Params");
      return;
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error.stack);
    res.status(400).json("INVALID ORDER ID!");
  } finally {
    await client.end();
  }
});

module.exports = orderRouter;
