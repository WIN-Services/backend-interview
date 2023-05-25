import express from "express";
import OrderController from "./Orders/OrdersController.js";
import bodyParser from "body-parser";
import config from "./configs/development.js";
import { buildResponse } from "./Utility/utility.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

export default class Server {
  constructor(central) {
    this.orderController = new OrderController(central);
  }

  startServer() {
    app.post("/createOrder", async (req, res) => {
      await this.orderController.createOrder(req, res);
    });

    app.patch("/updateOrder/:orderID", async (req, res) => {
      await this.orderController.updateOrder(req, res);
    });

    app.get("/getOrder/:orderID", async (req, res) => {
      await this.orderController.getOrder(req, res);
    });

    app.get("/getOrders", async (req, res) => {
      await this.orderController.getOrders(req, res);
    });

    app.delete("/deleteOrder/:orderID", async (req, res) => {
      await this.orderController.deleteOrder(req, res);
    });

    app.use('/', (req, res) => {
      res.status(405).json({
        error: "API Endpoint doesn't exist"
      })
    })  

    app.listen(config.PORT, () => {
      console.log(`Server started at ${config.PORT}`);
    });
  }
}
