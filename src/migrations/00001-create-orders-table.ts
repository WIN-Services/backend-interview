import Sequelize, { QueryInterface } from "sequelize";

export = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      total_fee: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface: QueryInterface) => {
    return Promise.all([queryInterface.dropTable("orders")]);
  }
};
