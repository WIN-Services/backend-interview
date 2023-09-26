const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../app'); // Import your Express app
const Order = require('../models/Order'); // Import your Order model

chai.use(chaiHttp);
const expect = chai.expect;

// Configure Mongoose to use a test database
const dbURI = 'mongodb://localhost:27017/test-your-database-name';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


// TO get and order by id
describe('Order API', () => {
  // Before running tests, clear the test database and add a sample order for testing
  beforeEach(async () => {
    await Order.deleteMany({});
    const sampleOrder = new Order({
      id: '123',
      datetime: new Date(),
      totalfee: 100,
      services: [],
    });
    await sampleOrder.save();
  });

  // After running tests, close the database connection
  after(async () => {
    await mongoose.connection.close();
  });

  // Define a test case for "GET order by ID"
  it('should get an order by ID', (done) => {
    const orderId = '123'; // ID of the sample order you added

    chai.request(app)
      .get(`/orders/${orderId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(orderId);
        done();
      });
  });
});

// To create a new order
describe('Order API', () => {
    // Before running tests, clear the test database
    beforeEach(async () => {
      await Order.deleteMany({});
    });
  
    // After running tests, close the database connection
    after(async () => {
      await mongoose.connection.close();
    });
  
    // Define a test case for "POST create order"
    it('should create a new order', (done) => {
      const newOrder = {
        id: '123',
        datetime: new Date(),
        totalfee: 100,
        services: [],
      };
  
      chai.request(app)
        .post('/orders')
        .send(newOrder)
        .end((err, res) => {
          expect(res).to.have.status(201); // Expect a 201 status (Created)
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal(newOrder.id);
          // You can add more assertions to check other fields if needed
          done();
        });
    });
  });


  // To Update and order
  describe('Order API', () => {
    // Before running tests, clear the test database and add a sample order for testing
    beforeEach(async () => {
      await Order.deleteMany({});
      const sampleOrder = new Order({
        id: '123',
        datetime: new Date(),
        totalfee: 100,
        services: [],
      });
      await sampleOrder.save();
    });
  
    // After running tests, close the database connection
    after(async () => {
      await mongoose.connection.close();
    });
  
    // Define a test case for "PUT update order by ID"
    it('should update an existing order by ID', (done) => {
      const orderId = '123'; // ID of the sample order you added
      const updatedOrder = {
        totalfee: 150,
        services: [],
      };
  
      chai.request(app)
        .put(`/orders/${orderId}`)
        .send(updatedOrder)
        .end((err, res) => {
          expect(res).to.have.status(200); // Expect a 200 status (OK)
          expect(res.body).to.be.an('object');
          expect(res.body.totalfee).to.equal(updatedOrder.totalfee);
          // You can add more assertions to check other updated fields if needed
          done();
        });
    });
  });


  // To delete and order
  describe('Order API', () => {
    // Before running tests, clear the test database and add a sample order for testing
    beforeEach(async () => {
      await Order.deleteMany({});
      const sampleOrder = new Order({
        id: '123',
        datetime: new Date(),
        totalfee: 100,
        services: [],
      });
      await sampleOrder.save();
    });
  
    // After running tests, close the database connection
    after(async () => {
      await mongoose.connection.close();
    });
  
    // Define a test case for "DELETE order by ID"
    it('should delete an existing order by ID', (done) => {
      const orderId = '123'; // ID of the sample order you added
  
      chai.request(app)
        .delete(`/orders/${orderId}`)
        .end((err, res) => {
          expect(res).to.have.status(204); // Expect a 204 status (No Content)
          // The response body is empty for a successful deletion
          done();
        });
    });
  });