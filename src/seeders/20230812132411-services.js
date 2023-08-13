'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('services', [
      {
        name: 'Inspection',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Testing',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Analysis',
        created_at: new Date(),
        updated_at: new Date(),
      },
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('services', null, {});
  }
};
