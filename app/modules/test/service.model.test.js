const request = require("supertest");
const app = require("../../../server");

describe("POST /api/service/create", () => {
  it("should create a service", async () => {
    const res = await request(app).post("/api/v1/service/create").send({
        "name":"Service1"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("Service1");
  });
});

describe("PUT /api/service/:id", () => {
    it("should update a service", async () => {
      const res = await request(app)
        .put("/api/v1/service/update/636e259ed5fea6de334a8894")
        .send({
            "name":"Service1"
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toBe("Service1");
    });
  });

  describe("DELETE /api/service/:id", () => {
    it("should delete a service", async () => {
      const res = await request(app).delete(
        "/api/v1/service/delete/636d580448123ed6a372bb23"
      );
      expect(res.statusCode).toBe(200);
    });
  });

  describe("GET /api/service/:id", () => {
    it("should return a order", async () => {
      const res = await request(app).get(
        "/api/v1/service/filter?name=Inspection"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toBe("Inspection");
    });
  });

  describe("GET /api/service/all", () => {
    it("should return a services", async () => {
      const res = await request(app).get(
        "/api/v1/service/all"
      );
      expect(res.statusCode).toBe(200);
    });
  });