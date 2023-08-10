import express from "express";
import createHttpError from "http-errors";
import { z } from "zod"
import dotenv from "dotenv"

dotenv.config()

const app = express()

import ServerRoutes from "./routes/server.routes.js"
import { establishDBConnection } from "./configs/db.configs.js";
import serverConfig from "./configs/app.configs.js"

serverConfig(app)
ServerRoutes(app)

app.use((err, req, res, next) => {
    if (err instanceof z.ZodError) {
        console.log(err)
        res.status(400).json({
            status: false,
            message : err.format(),
        })
        // console.error('Validation errors:', err.issues);
        // console.error('Detailed error data:', err.data);
    } else {
        res.status(err.statusCode || err.code || 500).json({
            status: false,
            message: err.message || "Internal Server Error"
        })
        // console.error('Other error:', err.message);
    }
})

const PORT=process.env.PORT
async function startServer() {
    try {
        await establishDBConnection()

        app.listen(PORT, () => {
            console.log(`Server is listening at PORT:::::${PORT}`)
        })
    } catch (err) {
        console.log("Server failed to start")
    }
}

export {
    app, 
    startServer
}