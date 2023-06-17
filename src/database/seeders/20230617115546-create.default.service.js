'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Service', [
      {
        "id": 123,
        "name": "Inspection"
      },
      {
        "id": 789,
        "name": "Testing"
      },
      {
        "id": 456,
        "name": "Analysis"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Service', null, {});
  }
};
