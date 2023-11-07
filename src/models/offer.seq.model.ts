import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequelize";
import { Service } from "./service.seq.model";
export class Offer extends Model {}
Offer.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    serviceId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "serviceId",
      references: {
        model: 'services',
        key: 'id'
      }
    },
    totalfee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "totalfee",
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
  { sequelize, paranoid: true, freezeTableName: true, modelName: "offers" }
);
Offer.belongsTo(Service, { foreignKey: 'serviceId', as: 'Services' });
