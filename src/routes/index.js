const express = require('express');
const orderRoutes = require('./order.route');
const serviceRoutes = require('./service.route');

const routes = express.Router();

const defaultRoutes = [ 
  {
    path: '/order',
    route: orderRoutes,
  },
  {
    path: '/service',
    route: serviceRoutes,
  },
];

defaultRoutes.forEach((route) => {
    routes.use(route.path, route.route);
});

module.exports = routes;
