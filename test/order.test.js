const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const Order = require("../models/order");

before(async () => {
  // Connect to the test database before running the tests
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

after(async () => {
  // Close the database connection after running the tests
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clear the database before each test
  await Order.deleteMany();
});

describe("Order Management System", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await Order.deleteMany();
  });

  after(async () => {
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
