const { expect } = require('chai');
const sinon = require('sinon');
const appError = require('../server/utils/appError');
const Service = require('../server/models/services');
const serviceService = require('../server/services/service.service');

describe('serviceService', () => {
    describe('createService', () => {
      it('should create a service and return data', async () => {
        const req = {
          body: {
            name: 'Test Service',
          },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
        const createStub = sinon.stub(Service, 'create').resolves('someData');
        await serviceService.createService(req, res);
        sinon.assert.calledWithExactly(createStub, req.body);
        createStub.restore();
      });
    });
  
    describe('getallService', () => {
      it('should get all services', async () => {
        const findStub = sinon.stub(Service, 'find').resolves(['service1', 'service2']);
        const result = await serviceService.getallService();
        sinon.assert.calledWithExactly(findStub, {});
        expect(result).to.deep.equal(['service1', 'service2']);
        findStub.restore();
      });
    });
  });