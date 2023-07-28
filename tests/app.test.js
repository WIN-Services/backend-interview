const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');
const mongoose = require('mongoose');
const { responseMessage } = require('../constants');
before(async () => {
  // Connect to the test database before running the tests
  await mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "win-order-management"
  });
});

describe('Order Management System API', () => {
  let orderId;

  it('should create a new order', async () => {
    const newOrder = {
      id: 'R5',
      datetime: new Date(),
      totalfee: 200,
      services: [
        {
          id : 1
        },
      ],
    };

    const res = await request(app).post('/orders').send(newOrder);
    console.log(res.body);
    expect(res.statusCode).to.equal(201);
    data = res.body.data;
    console.log(data);
    expect(data.id).to.equal(newOrder.id);
    orderId = newOrder.id;
  });

  it('should not create an order with a duplicate ID', async () => {
    const duplicateOrder = {
      id: 'R5',
      datetime: new Date(),
      totalfee: 300,
      services: [
        {
          id:2
        },
      ],
    };

    const res = await request(app).post('/orders').send(duplicateOrder);

    expect(res.statusCode).to.equal(400);
    expect(res.body.error.message).to.equal(responseMessage.RECORD_EXIST);
  });


  it('should delete an existing order', async () => {
    const res = await request(app).delete(`/orders/${orderId}`);

    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal(responseMessage.DELETE_RECORD);
  });

  it('should retrieve all orders', async () => {
    const res = await request(app).get('/orders');

    expect(res.statusCode).to.equal(200);
  })
  after(async () => {
    await mongoose.connection.close();
  });
});