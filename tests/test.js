const request = require("supertest");
const config = require("../config/index")
const baseURL = "http://localhost:7001";
const app = require("../server.js");

//Testing the server route is live
describe("GET /", () => {
  test("Testing server is live", async () => {
    let data = await request(app)
      .get('/')
      .expect(200);
  });
});

//GET all orders
describe("GET /orders/getall", () => {
  test("It should respond with an array of orders and should have the status 200", async () => {
    let data = await request(app)
      .get('/orders/getall')
      .set('Authorization', `Bearer ${config.auth}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

//GET one order
describe("GET /orders/get/:orderId", () => {
  test("It should respond with one particular order have the status 200", async () => {
    let data = await request(app)
      .get('/orders/get/646bd121aca9cbc05d7c4855')
      .set('Authorization', `Bearer ${config.auth}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});


//POST one order with status as incomplete
describe("POST /orders/post", () => {
  test("It should post one order after 3 hours and having the status 200", async () => {
    let data = await request(app)
      .post('/orders/post')
      .send({
        "services": [
          {
            "id": "123"
          }
        ],
        "totalfee": 200
      })
      .set('Authorization', `Bearer ${config.auth}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

//PUT/UPDATE one order with status as incomplete
describe("PUT /orders/update", () => {
  test("It should update an order provided time is greater than 3 hours and having the status 200", async () => {
    let data = await request(app)
      .put('/orders/update')
      .send({
        "services": [
          {
            "id": "123"
          }
        ],
        "orderId": "646bd121aca9cbc05d7c4855"
      })
      .set('Authorization', `Bearer ${config.auth}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

//DELETE one order
describe("DELETE /orders/update", () => {
  test("It should delete an order of the orderId and return the status 200", async () => {
    let data = await request(app)
      .delete('/orders/delete')
      .send({
        "orderId":"646bceb4be283b2fad3cbee4"
      })
      .set('Authorization', `Bearer ${config.auth}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

afterAll((done) => {
  done();
});
