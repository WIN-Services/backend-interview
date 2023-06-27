import express from 'express';
const app = express();
import ordersRoute from "./orders.js";

//Import all routes here
app.use("/order/", ordersRoute);

export default app;
