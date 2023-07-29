const { expect } = require('chai');

const orderController = require('./order.controller');

describe('Order Controller', () => {
describe('createOrder()', () => {
    it('should add a new order and return the added order', async () => {
      const totalFee = 100;
      const serviceIds = [1];
      const order = await orderController.createOrder({ totalFee, serviceIds });
      expect(order.totalFee).to.equal(totalFee);
    });

    it('should throw Bad request error if totalFee is not passed', async () => {
      try {
        const serviceIds = [1];
        await orderController.createOrder({ serviceIds });
        expect(true).to.equal(false); // To make sure that this line is not executed
      } catch (error) {
        expect(error.code).to.equal(400);
      }
    });

    it('should throw Bad request error if serviceIds is not passed', async () => {
      try {
        const totalFee = 100;
        await orderController.createOrder({ totalFee });
        expect(true).to.equal(false);
      } catch (error) {
        expect(error.code).to.equal(400);
      }
    });
  });

  describe('updateOrder()', () => {
    it('should update totalFee and services of order', async () => {
      const updatedFee = 300;
      const addServiceIds = [2, 3];
      const order = await orderController.updateOrder(2, { totalFee: updatedFee, addServiceIds });
      expect(order.totalFee).to.equal(updatedFee);
    });

    it('should throw Forbidden error if order is created less than 3 hours ago', async () => {
      try {
        const updatedFee = 300;
        const order = await orderController.updateOrder(1, { totalFee: updatedFee });
        expect(true).to.equal(false);
      } catch (error) {
        expect(error.code).to.equal(403);
      }
    });

    it('should throw Not found error if order not exist', async () => {
      try {
        const updatedFee = 300;
        const order = await orderController.updateOrder(100, { totalFee: updatedFee });
        expect(true).to.equal(false);
      } catch (error) {
        expect(error.code).to.equal(404);
      }
    });
  });

  describe('getOrders()', () => {
    it('should return list of all orders', async () => {
      const orders = await orderController.getOrders();
      expect(orders).to.have.length.greaterThan(0);
    });
  });

  describe('getOrderById()', () => {
    it('should return an order by id', async () => {
      const order = await orderController.getOrderById(1);
      expect(order).to.have.property('id').to.equal(1);
    });

    it('should throw Not found error if order not exist', async () => {
      try {
        const order = await orderController.getOrderById(100);
        expect(true).to.equal(false)
      } catch (error) {
        expect(error.code).to.equal(404);
      }
    });
  });

  describe('deleteOrderById()', () => {
    it('should delete an order', async () => {
      const response = await orderController.deleteOrderById(1);
      expect(response).to.deep.equal({ success: true });
    });

    it('should throw Not found error if order not exist', async () => {
      try {
        const order = await orderController.deleteOrderById(100);
        expect(true).to.equal(false)
      } catch (error) {
        expect(error.code).to.equal(404);
      }
    });
  });
});
