const dbConfig = require("../config/config").database;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.url, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: false, // Disable SSL
  },

  // TODO: When any raw SQL queries have been removed, we should migrate to the `backend` schema.
  // schema: 'backend',
  // search_path: 'backend',

  define: {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
  },

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.order_model = require("./order.model")(sequelize, Sequelize.DataTypes);
db.service_model = require("./service.model")(sequelize, Sequelize.DataTypes);
db.order_model.belongsTo(db.service_model, {
  foreignKey: "service_id",
  as: "services",
});

sequelize.sync({ force: false, alter: true }).catch((err) => {
  console.error(err.message);
});

module.exports = db;
