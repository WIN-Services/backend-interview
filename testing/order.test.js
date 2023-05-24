
const request = require("supertest");
const app = require("../server.js");

describe("GET /orders", () => {
  test("It should an array of all the orders present in db", async () => {
    let data = await request(app)
      .get('/orders')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});


describe("GET /order/:orderId", () => {
  test("It should return a single order with given orderId", async () => {
    let data = await request(app)
      .get('/order/123')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});



describe("POST /orders/post", () => {
  test("It should add the order to the db", async () => {
    let data = await request(app)
      .post('/order')
      .send({
        "id": 111,
        "totalfee": 200,
        "services": ["Inspection", "Testing"]
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

