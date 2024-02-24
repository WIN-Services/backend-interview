import request from "supertest";
import { app, server } from "../index";

describe("Service Controller", () => {
  afterAll(() => {
    server.close();
  });
  it("should get services", async () => {
    const response = await request(app).get("/api/service");
    expect(response.status).toBe(200);
  });

  it("should get not services", async () => {
    const response = await request(app).get("/api/services");
    expect(response.status).toBe(404);
  });

  it("should get create services", async () => {
    const response = await request(app).get("/api/service/999");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(
      "service with serviceId: 999 does not exist"
    );
  });
});
