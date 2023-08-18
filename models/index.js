const Sequelize = require('sequelize');

// console.log(process.env.PG_DATABASE);
// console.log(process.env.PG_USER)
// console.log(process.env.PG_PASSWORD)
// console.log(process.env.PG_HOST);

const sequelize = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USER,
    
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: 'postgres',
        logging: false
    }
);

const UserModel = require('./userModel');
const OrderModel = require("./orderModel");
const ServicesModel = require("./servicesModel");
const OrderServiceJunctionModel = require('./orderServicesJunctionModel');

const User = UserModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
const Service = ServicesModel(sequelize, Sequelize);
const OrderService = OrderServiceJunctionModel(sequelize, Sequelize, Order, Service);



Order.belongsTo(User, { foreignKey: "userId", as: "userDetails" });
Order.belongsToMany(Service, { through: OrderService } )
Service.belongsToMany(Order, { through: OrderService } )

sequelize.authenticate().then(()=> {
    console.log("Connected to Database :)")
})

sequelize.sync({ alter: true }).then(() => {
    console.log(`Alter Database & tables created!`)
})

module.exports.sequelize = sequelize;
module.exports.User = User;
module.exports.Order = Order;
module.exports.Service = Service;
module.exports.OrderService = OrderService;