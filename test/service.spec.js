const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

const Service = require("../models/service")(sequelize, Sequelize);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  sequelize.close();
});

describe("Service Creation", () => {
  test("should insert a service in service table", async () => {
    const data = { name: "Home Inspection" };
    await Service.create(data);
    const insertedDocument = await Service.findOne({ where: data });
    expect(insertedDocument).toMatchObject(data);
  });
});
