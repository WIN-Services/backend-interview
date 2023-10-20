module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'services',
    [
      {
        name: 'New tap',
        description: 'tap installed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'New wire',
        description: 'new wire installed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('services', null, {}),
};
