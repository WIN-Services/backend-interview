
let request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const createServiceRoute = require("../routes/service.routes"); // Import the service routes module

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(createServiceRoute);

describe('POST /createService', () => {
    it('should add a service successfully', async () => {
        const response = await request(app)
            .post('/createService')
            .set('Content-Type', 'application/json')
            .send({ name: 'Home Inspection' })
            .expect(200);

        expect(response.body).toEqual({
            acknowledged: true,
            insertedId: expect.any(String),
            message: "service added successfully"
        });
    });
});
