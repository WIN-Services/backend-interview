import request from "supertest";
import { app, server } from "../index";

describe("Order Controller", () => {
  afterAll(() => {
    server.close();
  });
  it("should get orders", async () => {
    const response = await request(app).get("/api/order");
    expect(response.status).toBe(200);
  });

  it("should get not orders", async () => {
    const response = await request(app).get("/api/orders");
    expect(response.status).toBe(404);
  });

  it("should get create orders", async () => {
    const response = await request(app).get("/api/order/999");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("order with orderId: 999 does not exist");
  });
});
