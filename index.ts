import "reflect-metadata"
import { createConnection } from "typeorm"
import express from "express";
import * as bodyParser from "body-parser"
import cors from "cors";
import { Request, Response } from "express"
import router from "./src/routes";

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express()
    app.use(cors())
    app.use(bodyParser.json())
    app.use(express.urlencoded({ extended: true }));

    app.use("/", router);

    // start express server
    app.listen(4001);
    console.log("Express server has started on port 4001.")
})
.catch((error) => console.log(error))

