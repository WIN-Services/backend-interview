
const request = require('supertest');
const express = require('express');
const createOrderRoute = require("../routes/order.routes");

// Create a mock Express app and mount the route
const app = express();
app.use(express.json());
app.use(createOrderRoute);

describe('POST /createOrder', () => {
    it('should create an order successfully', async () => {
        // Define the request body
        const requestBody = {
            serviceId: 124,
            totalfee: 6000,
            services: [{ id: 124 }]
        };

        // Sending a POST request to the API endpoint with the request body
        const response = await request(app)
            .post('/createOrder')
            .set('Content-Type', 'application/json')
            .send(requestBody)
            .expect(200); // Expecting a successful response with status code 200


        expect(response.body).toEqual({
            acknowledged: true,
            insertedId: expect.any(String), // Checking if insertedId is a string
            message: 'order created successfully'
        });
    });
});
