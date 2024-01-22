const { expect } = require('chai');
const sinon = require('sinon');
const ServiceController = require('../server/controller/service.controller');
const serviceServices = require('../server/services/service.service');

describe('ServiceController', () => {
  let serviceController;

  beforeEach(() => {
    serviceController = new ServiceController();
  });

  describe('createService', () => {
    it('should respond with success message and status code 201', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const createServiceStub = sinon.stub(serviceServices, 'createService').resolves('someData');

      await serviceController.createService()(req, res);

      sinon.assert.calledWithExactly(res.status, 201);
      sinon.assert.calledWithExactly(res.json, {
        status: 'success',
        isSuccess: true,
        message: 'Service created successfully.',
        data: 'someData',
      });
      createServiceStub.restore();
    });
  });

  describe('getallService', () => {
    it('should respond with success message and status code 200', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const getallServiceStub = sinon.stub(serviceServices, 'getallService').resolves('someData');

      await serviceController.getallService()(req, res);

      sinon.assert.calledWithExactly(res.status, 200);
      sinon.assert.calledWithExactly(res.json, {
        status: 'success',
        isSuccess: true,
        message: 'Service listed successfully.',
        data: 'someData',
      });
      getallServiceStub.restore();
    });
  });
  after(() => {
    sinon.restore();
  });
});