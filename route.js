const order_route = require('./app/modules/routes/order.route');
const service_route = require('./app/modules/routes/service.route');

module.exports = [
    {
        path: '/api/v1/order',
        handler: order_route
    },
    {
        path: '/api/v1/service',
        handler: service_route
    }

]