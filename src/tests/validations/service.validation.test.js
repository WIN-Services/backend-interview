const Joi = require('joi');
const { getServiceById, createService, updateService, deleteService } = require('../../validations/service.validation');

describe('Service Validations', () => {
  describe('getServiceById', () => {
    it('should validate the serviceId parameter', () => {
      const validInput = { serviceId: 123 };
      const { error } = getServiceById.params.validate(validInput);
      expect(error).toBeUndefined();

      const invalidInput = { serviceId: 'abc' };
      const { error: invalidError } = getServiceById.params.validate(invalidInput);
      expect(invalidError).toBeDefined();
    });
  });

  describe('createService', () => {
    it('should require the name property', () => {
      const validInput = { name: 'Service A' };
      const { error } = createService.body.validate(validInput);
      expect(error).toBeUndefined();

      const incompleteInput = {};
      const { error: incompleteError } = createService.body.validate(incompleteInput);
      expect(incompleteError).toBeDefined();
    });
  });

  describe('updateService', () => {
    it('should validate the serviceId parameter', () => {
      const validInput = { serviceId: 123 };
      const { error } = updateService.params.validate(validInput);
      expect(error).toBeUndefined();

      const invalidInput = { serviceId: 'abc' };
      const { error: invalidError } = updateService.params.validate(invalidInput);
      expect(invalidError).toBeDefined();
    });

    it('should require the name property', () => {
      const validInput = { name: 'Service A' };
      const { error } = updateService.body.validate(validInput);
      expect(error).toBeUndefined();

      const incompleteInput = {};
      const { error: incompleteError } = updateService.body.validate(incompleteInput);
      expect(incompleteError).toBeDefined();
    });
  });

  describe('deleteService', () => {
    it('should validate the serviceId parameter', () => {
      const validInput = { serviceId: 123 };
      const { error } = deleteService.params.validate(validInput);
      expect(error).toBeUndefined();

      const invalidInput = { serviceId: 'abc' };
      const { error: invalidError } = deleteService.params.validate(invalidInput);
      expect(invalidError).toBeDefined();
    });
  });
});
