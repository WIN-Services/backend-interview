const request = require("supertest");
const app = require("../../../server");


describe("POST /api/order/create", () => {
  it("should create a order", async () => {
    const res = await request(app).post("/api/v1/order/create").send({
      totalfee: 255,
      service: "636d57fe48123ed6a372bb21",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.totalfee).toBe(255);
  });
});

describe("PUT /api/order/:id", () => {
    it("should update a order", async () => {
      const res = await request(app)
        .put("/api/v1/order/update/636e21e7203aecdfd0c41a03")
        .send({
            "totalfee": 678,
            "service":"636d580d48123ed6a372bb25"
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.totalfee).toBe(678);
    });
  });

  describe("DELETE /api/order/:id", () => {
    it("should delete a order", async () => {
      const res = await request(app).delete(
        "/api/v1/order/delete/636e21e7203aecdfd0c41a03"
      );
      expect(res.statusCode).toBe(200);
    });
  });

  describe("GET /api/order/:id", () => {
    it("should return a order", async () => {
      const res = await request(app).get(
        "/api/v1/order/filter?orderId=636e21e7203aecdfd0c41a03"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.data.totalfee).toBe(255);
    });
  });

  describe("GET /api/order/all", () => {
    it("should return a orders", async () => {
      const res = await request(app).get(
        "/api/v1/order/all"
      );
      expect(res.statusCode).toBe(200);
    });
  });