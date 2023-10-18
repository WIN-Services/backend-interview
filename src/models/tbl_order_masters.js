'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_order_masters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.tbl_service_masters,{
        through:models.tbl_order_service_mappings,
        as:"services",
        foreignKey:"orderId",
        otherKey:"serviceId"
      })
    }
  }  
  tbl_order_masters.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false
    },
    totalFee:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      allowNull:true,
      type: DataTypes.DATE
    }   
  }, {
    sequelize,
    timestamps:true,
    modelName: 'tbl_order_masters',
    paranoid:true
  });
  return tbl_order_masters;
};