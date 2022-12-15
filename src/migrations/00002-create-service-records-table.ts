import Sequelize, { QueryInterface } from "sequelize";

export = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("service_records", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
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
    return Promise.all([queryInterface.dropTable("service_records")]);
  }
};
