const { expect } = require("chai");
const supertest = require("supertest");
// const app = require('../app/routes');
const app = require("../server");

const request = supertest(app);

describe("Order API", () => {
  it("should create a new record", async () => {
    const res = await request
      .post("/servicerecords")
      .send({ name: "Analysing" });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    expect(res.body.name).to.equal("Analysing");
  });

  it("should create a new record", async () => {
    const res = await request.post("/orders").send({
      datetime: "2022-11-01T11:11:11.111Z",
      totalfee: 100,
      services: [
        {
          id: 1,
        },
      ],
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    expect(res.body.datetime).to.equal("2022-11-01T11:11:11.111Z");
  });

  it("should retrieve records", async () => {
    const res = await request.get("/orders/1");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
  });

  it("should update a record", async () => {
    const recordsRes = await request.get("/orders");
    const recordId = recordsRes.body[0].id;

    const res = await request
      .put(`/orders/${recordId}`)
      .send({ totalfee: 101 });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("id");
    expect(res.body.totalfee).to.equal("101");
  });

  it("should delete a record", async () => {
    const recordsRes = await request.get("/orders");
    // console.log(recordsRes)
    const recordId = recordsRes.body[0].id;

    const res = await request.delete(`/orders/${recordId}`);

    expect(res.status).to.equal(200);
    expect(res.body.msg).to.equal("DELETED");
  });

  it("should delete a record", async () => {
    const recordsRes = await request.get("/servicerecords");
    // console.log(recordsRes)
    const recordId = recordsRes.body[0].id;

    const res = await request.delete(`/servicerecords/${recordId}`);

    expect(res.status).to.equal(200);
    expect(res.body.msg).to.equal("DELETED");
  });
});
