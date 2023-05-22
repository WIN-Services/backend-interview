const request = require("supertest");
const baseURL = "http://localhost:7001";

const app = require("../server.js");

// Can add more assrtions and improvements on the way

describe("GET /", () => {
  test("It should respond with an array of orders and should have the status 200", async () => {
    const response = await request(app);
    console.log(response);
    expect(response.status).toEqual(200);
  });
});

afterAll((done) => {
  done();
});
