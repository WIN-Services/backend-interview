module.exports = async function (sequelize) {
    await sequelize.models.service.bulkCreate([
        {
            serviceID: 123,
            name: "Inspection"
          },
          {
            serviceID: 789,
            name: "Testing"
          },
          {
            serviceID: 456,
            name: "Analysis"
          }
    ]);
};
