import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

const OrdersModel = sequelize.define(
  "orders",
  {
    orderId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.STRING(320),
      allowNull: false,
    },
    totalFees: {
      type: DataTypes.INTEGER,
    },
    services: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW"),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW"),
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    modelName: "orders",
  }
);
OrdersModel.sync();

export default OrdersModel;
