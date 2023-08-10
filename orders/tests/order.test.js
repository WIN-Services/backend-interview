const mongoose = require("mongoose");
const request = require("supertest");
const dotenv = require('dotenv');

const app = require("../../server");
dotenv.config({ path: './config.env' });

var orderId = "";

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});
  
afterEach(async () => {
    await mongoose.connection.close();
});


describe("GET /orders", () => {
    it("should return all orders", async () => {
      const res = await request(app).get("/orders?page=1&limit=10")
      .send({
        user: {
            role: "admin",
        }
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("POST /orders", () => {
    it("should create a order", async () => {
      const res = await request(app).post("/orders").send({
        user: {
            role: "admin",
        },
        services: ["64d48795aedb1fe2f2719d24", "64d48795aedb1fe2f2719d26"]
      });
      
      orderId = res.body._id
      expect(res.statusCode).toBe(200);
    });
});

describe("POST /orders", () => {
  it("should return Unauthorized Error, if calling Api with user token", async () => {
    const res = await request(app).post("/orders").send({
      user: {
          role: "user",
      },
      services: ["64d48795aedb1fe2f2719d24", "64d48795aedb1fe2f2719d26"]
    });
    
    orderId = res.body._id
    expect(res.statusCode).toBe(403);
  });
});

describe("POST /orders", () => {
  it("should return Unauthorized Error, if calling Api within 3 hrs", async () => {
    const res = await request(app).post("/orders").send({
      user: {
          role: "admin",
      },
      services: ["64d48795aedb1fe2f2719d24", "64d48795aedb1fe2f2719d26"]
    });
    
    orderId = res.body._id
    expect(res.statusCode).toBe(403);
  });
});

describe("GET /orders/:id", () => {
    it("should return a orders", async () => {
      const res = await request(app).get(
        `/orders/${orderId}`
    ).send({
        user: {
            role: "admin",
        }
    });
      expect(res.statusCode).toBe(200);
    });
});

describe("PUT /orders/:id", () => {
  it("should return Unauthorized Error, if calling Api with user token", async () => {
    const res = await request(app).put(
      `/orders/${orderId}`
  ).send({
      user: {
          role: "user",
      },
      services: ["64d48795aedb1fe2f2719d24"]
  });
    expect(res.statusCode).toBe(403);
  });
});

describe("PUT /orders/:id", () => {
    it("should update a orders", async () => {
      const res = await request(app).put(
        `/orders/${orderId}`
    ).send({
        user: {
            role: "admin",
        },
        services: ["64d48795aedb1fe2f2719d24"]
    });
      expect(res.statusCode).toBe(200);
    });
});

describe("DELETE /orders/:id", () => {
  it("should return Unauthorized Error, if calling Api with user token", async () => {
    const res = await request(app).delete(
      `/orders/${orderId}`
  ).send({
      user: {
          role: "user",
      }
  });
    expect(res.statusCode).toBe(403);
  });
});

describe("DELETE /orders/:id", () => {
    it("should Delete a orders", async () => {
      const res = await request(app).delete(
        `/orders/${orderId}`
    ).send({
        user: {
            role: "admin",
        }
    });
      expect(res.statusCode).toBe(200);
    });
});