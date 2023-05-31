const request = require("supertest");
const app = require("../server");

describe("GET /services", () => {
  it("should return all service records", async () => {
    const res = await request(app).get("/services");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /orders", () => {
  it("should return all orders with services populated", async () => {
    const res = await request(app).get("/orders");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].services.length).toBeGreaterThan(0);
  });
});

describe("GET /orders/:orderId", () => {
  it("should return a specific order", async () => {
    const order = {
      totalfee: 400,
      services: ["64777b589e65ac098c502909"],
    };
    const createdOrder = await request(app).post("/orders").send(order);

    const res = await request(app).get(`/orders/${createdOrder.body._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.totalfee).toEqual(order.totalfee);
    expect(res.body.services).toEqual(order.services);
  });

  it("should return an error if order is not found", async () => {
    const res = await request(app).get("/orders/64777b589e65ac098c502909");
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("Order not found.");
  });
});

describe("DELETE /orders/:orderId", () => {
  it("should remove an existing order", async () => {
    const order = {
      totalfee: 900,
      services: ["64777b589e65ac098c502909"],
    };
    const createdOrder = await request(app).post("/orders").send(order);

    const res = await request(app).delete(`/orders/${createdOrder.body._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Order removed successfully.");
  });

  it("should return an error if order is not found", async () => {
    const res = await request(app).delete("/orders/64777b589e65ac098c502909");
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("Order not found.");
  });
});
