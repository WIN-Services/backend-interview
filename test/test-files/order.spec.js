let expect = require("chai").expect;
const chai = require('chai')
const app = require("../../index");
const OrderModel = require("../../core/schemas/orderSchema");
const ServiceModal = require("../../core/schemas/serviceSchema");
const { load_data } = require("../test-db/test-db-helper");

describe("Order Service apis", () => {
  let req_body = {};
  let order_id_1, order_id_2, service_id_1, service_id_2 = null;

  it("should load sample data", async () => {
    await load_data();
    const data = await OrderModel.find().populate("services");
    order_id_1 = data[0].order_id;
    order_id_2 = data[1].order_id;
    service_id_1 = data[0].services[0]._id.valueOf();
    service_id_2 = data[0].services[1]._id.valueOf();
  });

  describe("GET /order/:id", async () => {
    it("should return 404 when id not present", async () => {
      let req_url = "/api/v1/order/64c15a02a104d3f53c1";

      const response = await chai.request(app).get(req_url);

      expect(response.statusCode).to.equal(404);
      response.body.should.have.property("error_message");
      expect(response.body.error_message).to.equal(
        "Order not found for id 64c15a02a104d3f53c1"
      );
    });

    it("should return 200 when id present", async () => {
      let req_url = `/api/v1/order/${order_id_1}`;

      const response = await chai.request(app).get(req_url);

      expect(response.statusCode).to.equal(200);
      response.body.should.have.property("order_id");
      response.body.should.have.property("totalfee");
      response.body.should.have.property("services");
      expect(response.body.totalfee).to.equal(10000);
      expect(response.body.services).to.be.an("array");
    });
  });

  describe("UPDATE /order/:id", async () => {
    it("should return 404 when id not present", async () => {
      let req_url = "/api/v1/order/64c15a02a104d3f53c1";

      const response = await chai.request(app).put(req_url).send(req_body);

      expect(response.statusCode).to.equal(404);
      response.body.should.have.property("error_message");
      expect(response.body.error_message).to.equal(
        "Order not found for id 64c15a02a104d3f53c1"
      );
    });

    it("should return 400 when try to update existing order within 3 hrs", async () => {
      let req_url = `/api/v1/order/${order_id_2}`;

      const req_body = {
        "totalfee": 55555
      }

      const response = await chai.request(app).put(req_url).send(req_body);
      expect(response.statusCode).to.equal(400);
      response.body.should.have.property("error_message");
      expect(response.body.error_message).to.equal(
        "Please update order after 3 hours"
      );
    });

    it("should return 200 when id present and correct payload", async () => {
      let req_url = `/api/v1/order/${order_id_1}`;

      const req_body = {
        "totalfee": 55555
      }

      const response = await chai.request(app).put(req_url).send(req_body);
      expect(response.statusCode).to.equal(200);
      response.body.should.have.property("totalfee");
      expect(response.body.totalfee).to.equal(55555);
    });
  });

  describe("DELETE /order/:id", async () => {
    it("should return 404 when id not present", async () => {
      let req_url = "/api/v1/order/64c15a02a104d3f53c1";

      const response = await chai.request(app).delete(req_url);

      expect(response.statusCode).to.equal(404);
      response.body.should.have.property("error_message");
      expect(response.body.error_message).to.equal(
        "Order not found for id 64c15a02a104d3f53c1"
      );
    });

    it("should return 200 when id present", async () => {
      let req_url = `/api/v1/order/${order_id_2}`;

      const response = await chai.request(app).delete(req_url);

      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal("Success");
    });
  });

  describe("GET /order", async () => {
    it("should return 200 with all orders in body", async () => {
      let req_url = "/api/v1/order";

      const response = await chai.request(app).get(req_url);

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.lengthOf(1);
    });
  });

  describe("POST /order", async () => {
    let req_url = "/api/v1/order";

    it("should return 400 when validation failed", async () => {
      let req_body = {
        category: {
          wrong: "field",
        },
      };

      const response = await chai.request(app).post(req_url).send(req_body);

      expect(response.statusCode).to.equal(400);
      response.body.should.have.property("error_message");
      expect(response.body.error_code).to.equal("MISSING_FIELDS");
    });

    it("should return 200 when correct fields provided", async () => {
      let req_url = "/api/v1/order";

      const req_body = {
        order_id: "431",
        totalfee: 10000,
        services: [service_id_2],
      };

      const response = await chai.request(app).post(req_url).send(req_body);

      expect(response.statusCode).to.equal(200);
      response.body.should.have.property("order_id");
      response.body.should.have.property("totalfee");
      response.body.should.have.property("services");
    });
  });


});
