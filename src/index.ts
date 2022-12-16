/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { serviceRouter } from "./service/service.router";
import { orderRouter } from "./order/order.router";

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";


const app = express();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: string = process.env.PORT;


/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/service", serviceRouter);
app.use("/api/order", orderRouter);



app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});