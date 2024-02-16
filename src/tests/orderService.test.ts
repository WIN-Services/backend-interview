import request from "supertest";
import app from "../app";

describe("Order Management System API", () => {
  let orderId: string;

  // Test GET all orders
  it("should retrieve all orders", async () => {
    const res = await request(app).get("/orders");
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(0);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  // Test POST new order
  it("should create a new order", async () => {
    const newOrder = {
      datetime: "2024-02-16T11:11:11.111Z",
      totalfee: 200,
      services: [123],
    };
    const res = await request(app).post("/orders").send(newOrder);
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    orderId = res.body.data.id;
  });

  // // Test GET order by ID
  it("should retrieve the created order by ID", async () => {
    const res = await request(app).get(`/orders/${orderId}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id", orderId);
  });

  // // Test PUT update order by ID
  it("should update the created order", async () => {
    const updatedOrder = {
      id: orderId,
      datetime: "2022-12-01T11:11:11.111Z",
      totalfee: 300,
    };
    const res = await request(app).put(`/orders/${orderId}`).send(updatedOrder);
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject(updatedOrder);
  });

  // // Test DELETE order by ID
  it("should delete the created order", async () => {
    const res = await request(app).delete(`/orders/${orderId}`);
    console.log("RESULT: ", res);
    expect(res.status).toBe(204);
  });

  // // Test GET order by ID after deletion
  it("should not retrieve the deleted order by ID", async () => {
    const res = await request(app).get(`/orders/${orderId}`);
    expect(res.status).toBe(404);
  });
});
