import express from "express"

const serverConfig = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
}

export default serverConfig