const request = require("supertest");
const app = require("../server");
const chai = require("chai");
const expect = chai.expect;
const Order = require("../models/order");

describe("Order API", () => {
  let order;

  before(async () => {
    // Set up a test order
    order = new Order({
      _id: "229",
      datetime: "2022-11-01T11:11:11.111Z",
      totalfee: 100,
      services: [{ _id: "123" }],
    });
    await order.save();
  });

  after(async () => {
    // Clean up the test order
    await Order.deleteMany({_id: "229"});
  });

  it("should create a new order", () => {
    console.log("order", order);
    request(app)
      .post("/orders")
      .send(JSON.stringify(order))
      .then((res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body._id).to.equal("229");
      });
  });

  it("should get all orders", async () => {
    const res = await request(app).get("/orders");

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it('should get order by id', async () => {
    const res = await request(app).get(`/orders/${order._id}`);

    expect(res.statusCode).to.equal(200);
  });

  it("should update an order by ID", async () => {
    const res = await request(app)
      .put(`/orders/${order._id}`)
      .send({ totalfee: 150 });

    expect(res.statusCode).to.equal(200);
    expect(res.body.totalfee).to.equal(150);
  });

  it("should delete an order by ID", async () => {
    const res = await request(app).delete(`/orders/${order._id}`);

    expect(res.statusCode).to.equal(200);
    const deletedOrder = await Order.findById(order._id);
    expect(deletedOrder).to.be.null;
  });
});
