const { Sequelize } = require("sequelize");
const APP_CONSTANTS = require("../constants.js");
const ORDER_ERRORS = APP_CONSTANTS.ORDER.ERRORS;
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

const Service = require("../models/service")(sequelize, Sequelize);
const Order = require("../models/order")(sequelize, Sequelize);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  sequelize.close();
});

describe("Order API test cases", function () {
  describe("Create Order", function () {
    test("it should return 201 on sending service id and total fee", async function () {
      let service = await Service.create({ name: "Home Inspection" });
      let insertRecord = { serviceId: service.id, totalFee: 100 };
      await Order.create(insertRecord);

      let insertedOrder = await Order.findOne({ where: { serviceId: 1 } });
      expect(insertedOrder).toMatchObject(insertRecord);
    });

    describe("Fetch All Orders", function () {
      test("Fetch 2 Orders", async function () {
        let service = await Service.create({ name: "Home Analysis" });
        await Order.create({ totalFee: 300, serviceId: service.id });
        let orders = await Order.findAll();
        expect(orders).toHaveLength(2);
      });
    });
  });
});
