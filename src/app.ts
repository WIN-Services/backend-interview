import express from "express";
import bodyParser from "body-parser";
import { dbService } from "./services/db.service";
import { errorHandler } from "./handler/error-handler";
import { OrderController } from "./controllers/order.controller";


// Create Express Server 
const app = express();

// Initialize services
dbService

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/public", express.static("./public", {maxAge: 31557600000}));

// ORDER
app.get("/orders", errorHandler(OrderController.list));
app.get("/orders/:orderId([0-9]+)", errorHandler(OrderController.show));
app.post("/orders", errorHandler(OrderController.create));
app.put("/orders/:orderId([0-9]+)", errorHandler(OrderController.update));
app.delete("/orders/:orderId([0-9]+)", errorHandler(OrderController.delete));

app.get("*", (req, res) => {
  res.send({data: "Works"});
});

export default app;