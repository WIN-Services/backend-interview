const Joi = require('joi');
const { getOrderById, createOrder, updateOrder, deleteOrder } = require('../../validations/order.validation');

describe('Order Validations', () => {
  describe('getOrderById', () => {
    it('should validate the orderId parameter', () => {
      const validInput = { orderId: 123 };
      const { error } = getOrderById.params.validate(validInput); 
      expect(error)

      const invalidInput = { orderId: 'abc' };
      const { error: invalidError } = getOrderById.params.validate(invalidInput);
      expect(invalidError).toBeDefined();
    });
  });

  describe('createOrder', () => {
    it('should validate the createOrder schema with valid input', () => {
      const validInput = {
        date_time: '2022-11-01T11:11:11.111Z',
        total_fee: 100,
        service_ids: [1, 2, 3]
      };
      const { error } = createOrder.body.validate(validInput);
      expect(error).toBeUndefined();
    });

    it('should validate the createOrder schema with invalid input', () => {
      const invalidInput = {
        date_time: 'invalid_date',
        total_fee: -50, // Invalid because min(0)
        service_ids: ['abc', 2, 3] // Invalid because not all are numbers
      };
      const { error } = createOrder.body.validate(invalidInput);
      expect(error).toBeDefined();
    });

    it('should require all properties', () => {
      const validInput = {
        date_time: '2022-11-01T11:11:11.111Z',
        total_fee: 100,
        service_ids: [1, 2, 3]
      };
      const { error } = createOrder.body.validate(validInput);
      expect(error).toBeUndefined();
      
      const incompleteInput = {
        date_time: '2022-11-01T11:11:11.111Z',
        total_fee: 100
      };
      const { error: incompleteError } = createOrder.body.validate(incompleteInput);
      expect(incompleteError).toBeDefined();
    });
  });

  describe('updateOrder', () => {
    it('should validate the orderId parameter', () => {
      const validInput = { orderId: 123 };
      const { error } = updateOrder.params.validate(validInput);
      expect(error).toBeUndefined();

      const invalidInput = { orderId: 'abc' };
      const { error: invalidError } = updateOrder.params.validate(invalidInput);
      expect(invalidError).toBeDefined();
    });

    it('should validate date_time and total_fee properties', () => {
      const validInput = {
        date_time: '2022-11-01T11:11:11.111Z',
        total_fee: 100
      };
      const { error } = updateOrder.body.validate(validInput);
      expect(error).toBeUndefined();

      const invalidInput = {
        date_time: 'invalid-date',
        total_fee: -10
      };
      const { error: invalidError } = updateOrder.body.validate(invalidInput);
      expect(invalidError).toBeDefined();
    });
  });

  describe('deleteOrder', () => {
    it('should validate the orderId parameter', () => {
      const validInput = { orderId: 123 };
      const { error } = deleteOrder.params.validate(validInput);
      expect(error).toBeUndefined();

      const invalidInput = { orderId: 'abc' };
      const { error: invalidError } = deleteOrder.params.validate(invalidInput);
      expect(invalidError).toBeDefined();
    });
  });

});
