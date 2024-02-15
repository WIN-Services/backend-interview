const express = require("express");
const orderRoutes = require("./order.routes");
const serviceRoutes = require("./service.routes");


const router = express.Router();

const routesConfig = [
    {
        path: "/",
        route: orderRoutes
    },
    {
        path: "/",
        route: serviceRoutes
    }
];

routesConfig.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;