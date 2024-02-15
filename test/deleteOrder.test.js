
const request = require('supertest');
const express = require('express');
const deleteOrderRoute = require("../routes/order.routes");


const app = express();
app.use(express.json());
app.use(deleteOrderRoute);

// Writing the test suite
describe('POST /deleteOrder', () => {
    it('should delete an order successfully', async () => {

        const requestBody = {
            id: 127
        };

        // Send a POST request to the API endpoint with the request body
        const response = await request(app)
            .post('/deleteOrder')
            .set('Content-Type', 'application/json')
            .send(requestBody)
            .expect(200);

        // Verify the response body
        expect(response.body).toEqual({
            acknowledged: true,
            deletedCount: expect.any(Number), // Checking if insertedId is a string
            message: 'order deleted successfully'
        });
    });
});
