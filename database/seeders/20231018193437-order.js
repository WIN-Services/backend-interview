module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "orders",
      [
        {
          status: "COMPLETED",
          description: "Tap leaking",
          totalFee: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: "IN_PROGRESS",
          description: "geyser not heating",
          totalFee: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],

      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("orders", null, {})
};
