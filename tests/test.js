const request = require("supertest");
const baseURL = "http://localhost:7001";

const app = require("../server.js");

// Can add more assrtions and improvements on the way

describe("GET /orders/getall", () => {
  test("It should respond with an array of orders and should have the status 200", async () => {
    // const response = await request(app);
    // console.log(response);
    // expect(response.status).toEqual(200);
    let data=await request(app)
    .get('/orders/getall')
    .set('Authorization', 'Bearer winservices@90')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  });

});

afterAll((done) => {
  done();
});
