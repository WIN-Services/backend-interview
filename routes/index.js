const express = require('express');
const orderRoutes = require('./order');

module.exports = (app) => {
    const routes = [
        {
            basePath: `${process.env.BASE_PATH}/order`,
            routes: orderRoutes
        },
    ];

    for (const route of routes) {
        app.use(route.basePath, route.routes(express.Router()));
    }
};
