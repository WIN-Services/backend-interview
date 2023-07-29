const Services = require('./services');
const Orders = require('./orders');
const OrderService = require('./orderService');

Orders.belongsToMany(Services, { through: OrderService });
Services.belongsToMany(Orders, { through: OrderService });

module.exports = {
  Services,
  Orders,
  OrderService,
};
