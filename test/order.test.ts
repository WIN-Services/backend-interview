import { expect } from 'chai';
import { Order } from '../src/models/order.model';
import { agent as request } from 'supertest';
import app from "../src/app";
import { Op, or } from 'sequelize';
import moment from 'moment';
import { orderService } from '../src/services/entities/order.service';

let orders: Order[] = [];

describe("Create Order Test", () => {

  before('- Before Creation', async () => {
    await Order.destroy({
      where: {
        id: {
          [Op.gte]: 1
        }
      }
    })
  })
  
  it('- Should POST /orders', async function () {
    const res = await request(app)
        .post('/orders').send({total_fee: 300, service_ids: [1]});
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body.data).not.to.be.empty;
    expect(res.body.data).to.be.a("object");
  });
  
  it('- Should POST /orders', async function () {
    const res = await request(app)
        .post('/orders').send({total_fee: 200, service_ids: [2]});
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body.data).not.to.be.empty;
    expect(res.body.data).to.be.a("object");
  });

  it("- Shouldn't POST /orders - (Too Many Request: 429)", async function () {
    const res = await request(app)
        .post('/orders').send({total_fee: 200, service_ids: [1,2]});
    expect(res.status).to.equal(429);
    expect(res.body).not.to.be.empty;
    expect(res.body.code).to.equal(103);
  });
  
  it("- Shouldn't POST /orders - (Unprocessable Entity: 422)", async function () {
    const res = await request(app)
        .post('/orders').send({total_fe: 200, service_ids: [1,2]});
    expect(res.status).to.equal(422);
    expect(res.body).not.to.be.empty;
    expect(res.body.errors).not.to.be.empty;
    expect(res.body.errors.length).to.be.greaterThanOrEqual(0);
  });

  it("- Shouldn't POST /orders - (Service Not Found: 102)", async function () {
    const res = await request(app)
        .post('/orders').send({total_fee: 200, service_ids: [0,1]});
    expect(res.status).to.equal(404);
    expect(res.body.message).not.to.be.empty;
    expect(res.body.message).to.equal("Service Record Not Found !!");
    expect(res.body.code).to.equal(102);
  });
});



describe("Show and List Orders Test", () => {
  
  it('- Should GET /orders', async function () {
    const res = await request(app).get('/orders');
    orders = res.body.data;
    
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body.data).not.to.be.empty;
    expect(res.body.data.length).to.be.greaterThanOrEqual(0);
  });
  
  it('- Should GET /orders/:orderId', async function () {
    const order = orders[Math.floor(Math.random() * orders.length)];
    const res = await request(app).get(`/orders/${order.id}`);
    
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body.data).not.to.be.empty;
    expect(res.body.data).to.be.an("object");
  });
  
  it("- Shouldn't GET /orders/:orderId - (Order Not Found: 404)", async function () {
    const res = await request(app).get(`/orders/99999999`);
    
    expect(res.status).to.equal(404);
    expect(res.body).not.to.be.empty;
    expect(res.body.message).not.to.be.empty;
    expect(res.body.message).to.equal("Order Not Found !!");
    expect(res.body.code).to.equal(101);
  });
})



describe("Update Order Tests", () => {

  it("- Shouldn't PUT /orders/:orderId (Order Not Found: 404)", async function () {
    const res = await request(app).put(`/orders/00000`).send({service_ids: [2]});
    
    expect(res.status).to.equal(404);
    expect(res.body).not.to.be.empty;
    expect(res.body.message).not.to.be.empty;
    expect(res.body.message).to.equal("Order Not Found !!");
    expect(res.body.code).to.equal(101);
  });

  it("- Shouldn't PUT /orders/:orderId (Service Record Not Found: 404)", async function () {
    const order = orders[Math.floor(Math.random() * orders.length)];
    const res = await request(app).put(`/orders/${order.id}`).send({service_ids: [0]});
    
    expect(res.status).to.equal(404);
    expect(res.body).not.to.be.empty;
    expect(res.body.message).not.to.be.empty;
    expect(res.body.message).to.equal("Service Record Not Found !!");
    expect(res.body.code).to.equal(102);
  });

  it("- Shouldn't PUT /orders/:orderId (Unprocessable Entity: 422)", async function () {
    const order = orders[Math.floor(Math.random() * orders.length)];

    const res = await request(app).put(`/orders/${order.id}`).send({service_id: [2]});
    
    expect(res.status).to.equal(422);
    expect(res.body).not.to.be.empty;
    expect(res.body.errors).not.to.be.empty;
    expect(res.body.errors.length).to.be.greaterThanOrEqual(0);
  });

  it("- Shouldn't PUT /orders/:orderId (Too many requests: 429)", async function () {
    const order = orders[Math.floor(Math.random() * orders.length)];    
    const res = await request(app).put(`/orders/${order.id}`).send({service_ids: [2]});
    
    expect(res.status).to.equal(429);
    expect(res.body).not.to.be.empty;
    expect(res.body.code).to.equal(103);
  });
})



describe("Delete Order Tests", () => {

  it('- Should DELETE /orders/:orderId', async function () {
    const order = orders[Math.floor(Math.random() * orders.length)];
    const res = await request(app).delete(`/orders/${order.id}`);
    
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.equal("Deleted Successfully");
  });
 
  it("- Shouldn't DELETE /orders/:orderId (Order Not Found: 404)", async function () {
    const res = await request(app).delete(`/orders/0`);
    
    expect(res.status).to.equal(404);
    expect(res.body).not.to.be.empty;
    expect(res.body.message).not.to.be.empty;
    expect(res.body.message).to.equal("Order Not Found !!");
    expect(res.body.code).to.equal(101);
  });
})