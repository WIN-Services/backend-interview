const request = require('supertest');

describe('CRUD Operation Test', () => {
  let orderId;
  let url = 'http://localhost:3000'

  // Test the CREATE (POST) endpoint
  it('should create a new order', async () => {
    const createOrderData = { 
        total_fee: 2000,
        service_id: 1
    }

    const response = await request(`${url}`)
      .post(`/`)
      .send(createOrderData)
      .expect(200);

    expect(response.body).toHaveProperty('orderId');
    orderId = response.body.orderId;
  });

  // Test the READ (GET) endpoint
  it('should get all orders', async () => {
    const response = await request(`${url}`)
      .get(`/`)
      .expect(200);
    expect(Array.isArray(response.body.data.rows)).toBeTruthy();
  });

  // Test the UPDATE (PUT) endpoint
  it('should update an order', async () => {
    const updatedOrderData = { 
        "id" : 1, 
        "total_fee": 2000,
        "service_id": 2
    };

    await request(`${url}`)
      .put(`/`)
      .send(updatedOrderData)
      .expect(200);
  });

  // Test the DELETE endpoint
  it('should delete a order', async () => {
    const deleteOrderData = { 
        "id" : 1,
    };
    await request(`${url}`)
      .delete(`/`)
      .send(deleteOrderData)
      .expect(200);
  });
});
