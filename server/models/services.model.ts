import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

const ServicesModel = sequelize.define(
  "services",
  {
    serviceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "services",
    modelName: "services",
    indexes: [
      {
        fields: ["serviceName"],
        unique: true,
      },
    ],
  }
);
ServicesModel.sync();

export default ServicesModel;
