module.exports = async function (sequelize) {
    await sequelize.models.order.bulkCreate([
        {
            orderID: 223,
            datetime: "2022-11-01T11:11:11.111Z",
            totalfee : 100,
            serviceID: 123
          },
          {
            orderID: 224,
            datetime: "2022-11-01T11:11:11.111Z",
            totalfee : 100,
            serviceID: 789
          },
          {
            orderID: 225,
            datetime: "2022-11-01T11:11:11.111Z",
            totalfee : 100,
            serviceID: 456
          }
    ]);
};
