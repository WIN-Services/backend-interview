const { expect } = require("chai");
const sinon = require("sinon");
const orderService = require("../server/services/order.service");
const AppError = require("../server/utils/appError");
const Order = require("../server/models/order");

describe("orderService", () => {
  describe("createOrder", () => {
    it("should create an order and return data", async () => {
      const req = {
        body: {
          totalfee: 100,
          services: ['service1', 'service2'],
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

          const createStub = sinon.stub(Order, 'create').resolves('someData');
          await orderService.createOrder(req, res);
          sinon.assert.calledWithExactly(createStub, req.body);
          createStub.restore();

    });

    it("should handle missing totalfee", async () => {
      const req = {
        body: {
          services: ["service1", "service2"],
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const result = await orderService.createOrder(req, res);

      sinon.assert.calledWithExactly(res.status, 422);
      sinon.assert.calledWithExactly(
        res.json,
        sinon.match.instanceOf(AppError)
      );
    });

    it("should handle missing services", async () => {
      const req = {
        body: {
          totalfee: 100,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const result = await orderService.createOrder(req, res);

      sinon.assert.calledWithExactly(res.status, 422);
      sinon.assert.calledWithExactly(
        res.json,
        sinon.match.instanceOf(AppError)
      );
    });
  });
});
