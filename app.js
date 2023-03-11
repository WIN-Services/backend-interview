const sequelize = require("./util/database");
const Order = require("./models/order");

console.log("initialising...")

sequelize
  .sync({force: true})
  // .sync()
  .then((result) => {
    console.log('connection established to postgres');
    // return Order.create({total: 1200021})
  })
//   .then(orders => {
//     console.log("order created : ", orders.dataValues );
//   })
  .catch((err) => {
    console.log('Error in connecting to Postgres db', err);
  });

  module.exports = {};