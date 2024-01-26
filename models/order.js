"use strict";
const { Model, Deferrable } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Service, { foreignKey: "serviceId" });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      datetime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      totalFee: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      serviceId: {
        type: DataTypes.BIGINT,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
