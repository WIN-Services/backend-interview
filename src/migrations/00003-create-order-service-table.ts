import Sequelize, { QueryInterface } from "sequelize";

export = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("order_service", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      order_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "orders",
          key: "id"
        },
        onDelete: "cascade"
      },
      service_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "service_records",
          key: "id"
        },
        onDelete: "cascade"
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
    return Promise.all([queryInterface.dropTable("order_service")]);
  }
};
