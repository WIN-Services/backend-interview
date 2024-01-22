const { expect } = require('chai');
const sinon = require('sinon');
const OrderController = require('../server/controller/order.controller');
const orderService = require('../server/services/order.service');
describe('OrderController', () => {
  let orderController;

  beforeEach(() => {
    orderController = new OrderController();
  });

  describe('createOrder', () => {
    it('should respond with success message and status code 201', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const createOrderStub = sinon.stub(orderService, 'createOrder').resolves('someData');

      await orderController.createOrder()(req, res);

      sinon.assert.calledWithExactly(res.status, 201);
      sinon.assert.calledWithExactly(res.json, {
        status: 'success',
        isSuccess: true,
        message: 'Order created successfully.',
        data: 'someData',
      });
      createOrderStub.restore();
    });
  });
  after(() => {
    sinon.restore();
  });
});