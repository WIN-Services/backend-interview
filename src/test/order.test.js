import request from 'supertest';
import app from '../../server.js';
import {StatusCodes} from '../constant/index.js';

describe('Orders API', () => {
    let serviceId = 1;
    let order_id;

    it('Creates a new order', async () => {
        const response = await request(app)
        .post('/api/orders')
        .send({
            total_fee: 100,
            service_ids: [serviceId],
        })
        .expect(StatusCodes.Created)
        .expect((res) => {
            if (!res.body.data.order_id) {
                throw "Order not created";
            }
            order_id = res.body.data.order_id
        })
    });

    it('should throw error for pre-existing order within 3 hours', async () => {
        // check for 3 hours of pre-existing order
        await request(app)
        .post('/api/orders')
        .send({
            total_fee: 100,
            service_ids: [serviceId],
        })
        .expect(StatusCodes.BadRequest)
    });

    it('should get order by order Id', async () => {
        const response = await request(app).get(`/orders/${order_id}`)
        .expect(response.statusCode).toBe(StatusCodes.Ok)
        .expect(response.body.data.order_id).toBe(order_id);
    });

    it('should update an existing order by ID', async () => {
        const response = await request(app)
            .put(`/api/orders/${order._id}`)
            .send({
                total_fee: 200,
                service_ids: [serviceId],
            })
        .expect(response.statusCode).toBe(200);
    });

    it('should delete order corresponding order_id', async () => {
        const response = await request(app).delete(`/orders/${order_id}`);
        expect(response.statusCode).toBe(200);
    });

    it('it should get all orders', async () => {
        const response = await request(app).get('/orders')
        .expect(response.statusCode).toBe(200)
        .expect(response.body.data.length).toBeGreaterThan(0);
    });
});
