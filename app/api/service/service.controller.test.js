const { expect } = require('chai');

const serviceController = require('./service.controller');

describe('Service Controller', () => {
  describe('addService()', () => {
    it('should add a new service and return the added service', async () => {
      const serviceName = 'Test Service';
      const service = await serviceController.addService({ name: serviceName });
      expect(service.name).to.equal(serviceName);
    });

    it('should throw Bad request error if name is not passed', async () => {
      try {
        await serviceController.addService({});
        expect(true).to.equal(false) // To make sure that this line is not executed
      } catch (error) {
        expect(error.code).to.equal(400);
      }
    });
  });

  describe('updateService()', () => {
    it('should update a service', async () => {
      const updatedName = 'Updated Service';
      const service = await serviceController.updateService(1, { name: updatedName });
      expect(service.name).to.equal(updatedName);
    });

    it('should throw Not found error if service not exist', async () => {
      try {
        const updatedName = 'Updated Service';
        await serviceController.updateService(100, { name: updatedName });
        expect(true).to.equal(false) // To make sure that this line is not executed
      } catch (error) {
        expect(error.code).to.equal(404);
      }
    });
  });

  describe('getServices()', () => {
    it('should return list of all services', async () => {
      const services = await serviceController.getServices();
      expect(services).to.have.length.greaterThan(0);
    });
  });

  describe('getServiceById()', () => {
    it('should return a service with provided id', async () => {
      const service = await serviceController.getServiceById(1);
      expect(service).to.have.property('id').to.equal(1);
    });

    it('should throw Not found error if service not exist', async () => {
      try {
        const service = await serviceController.getServiceById(100);
        expect(true).to.equal(false)
      } catch (error) {
        expect(error.code).to.equal(404);
      }
    });
  });

  describe('deleteServiceById()', () => {
    it('should delete a service', async () => {
      const response = await serviceController.deleteServiceById(1);
      expect(response).to.deep.equal({ success: true });
    });

    it('should throw Not found error if service not exist', async () => {
      try {
        const service = await serviceController.deleteServiceById(100);
        expect(true).to.equal(false)
      } catch (error) {
        expect(error.code).to.equal(404);
      }
    });
  });
});
