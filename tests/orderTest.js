const request = require("supertest");
const app = require("../server");

describe("orders", () => {
  let id = 1;

  test("will create a new order", async () => {
    const res = await request(app)
      .post("/orders")
      .send({ name: "abc", price: "562" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.price).toEqual("562");
  });

  test("will delete the order", async () => {
    const res = await request(app).delete(`/orders/${id}`);
    expect(res.statusCode).toEqual(204);
  });

  test("will delete the order", async () => {
    const res = await request(app)
      .put(`/orders${id}`)
      .send({ name: "shiv", price: "190" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ name: "shiv", price: "190" });
  });
});
