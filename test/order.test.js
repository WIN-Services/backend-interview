const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const Order = require("../src/models/order");

describe("Order Management System", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await Order.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new order", async () => {
    const orderData = {
      datetime: new Date(),
      totalfee: 100,
      services: [],
    };

    const response = await request(app).post("/api/orders").send(orderData);
    expect(response.status).toBe(201);
    expect(response.body.datetime).toBe(orderData.datetime.toISOString());
    expect(response.body.totalfee).toBe(orderData.totalfee);
  });

  it("should get all orders", async () => {
    const orderData1 = {
      datetime: new Date(),
      totalfee: 100,
      services: [],
    };

    const orderData2 = {
      datetime: new Date(),
      totalfee: 150,
      services: [],
    };

    await Order.create(orderData1);
    await Order.create(orderData2);

    const response = await request(app).get("/api/orders");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  // Add more test cases for other endpoints...
});
