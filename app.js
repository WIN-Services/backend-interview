const express = require("express");

const { sequelize } = require("./db/models");
const routes = require("./api").routes;
const config = require("./config");

const env = process.env["environment"] || "development";
const port = config[env].port;

const app = async () => {
    await sequelize.sync();
    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    routes.attach(app);
    return new Promise((accept, __) => {
        app.listen(port, () => {
            console.log(`Server is running at ${port}`);
            return accept();
        });
    });
};

module.exports = app;