const request = require('supertest')
const app = require('../server')

describe('Order API', () => {
    it('should create a new order', async () => {
        const orderData = {
            datetime: '2023-08-10T12:00:00.000Z',
            totalfee: 150,
            services: [
                { id: 123 },
                { id: 456 },
            ],
        }

        const response = await request(app).post('/orders').send(orderData);

        expect(response.status).toBe(200)
        expect(response.body).toMatchObject(orderData)
    })

    it('should not update an order within 3 hours of the last order', async () => {
        // Create an order first
        const orderData1 = {
            datetime: '2023-08-10T17:00:00.000Z',
            totalfee: 150,
            services: [
                { id: 123 },
                { id: 456 },
            ],
        }

        const createResponse = await request(app).post('/orders').send(orderData1)

        const orderId = createResponse.body.id;

        // Try to update the order within 3 hours
        const updatedOrderData = {
            datetime: '2023-08-10T17:00:00.000Z',
            totalfee: 200,
            services: [
                { id: 789 },
            ],
        }

        const updateResponse = await request(app).put(`/orders/${orderId}`).send(updatedOrderData)

        expect(updateResponse.status).toBe(400);
        expect(updateResponse.body).toHaveProperty('error', 'Order cannot be updated within 3 hours of last order');
    })

})

