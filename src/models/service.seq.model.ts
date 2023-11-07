import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequelize";
import { Offer } from "./offer.seq.model";
export class Service extends Model {}
Service.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    serviceName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "serviceName",
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "updated_at",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "deleted_at",
    }
  },
  { sequelize, paranoid: true, freezeTableName: true, modelName: "services" }
);
