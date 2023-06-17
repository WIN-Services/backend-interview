'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OrderService', {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      orderId: {
        type: new Sequelize.DataTypes.BIGINT,
        allowNull: false,
        references: { model: 'Order', key: 'id' },
      },
      serviceId: {
        type: new Sequelize.DataTypes.BIGINT,
        allowNull: false,
        references: { model: 'Service', key: 'id' },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('OrderService');
  }
};
