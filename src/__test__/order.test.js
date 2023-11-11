const request = require('supertest');
const mongoose = require('mongoose');
const express = require("express");
const { app } = require('../../server'); // Import app entry file where the routes are defined
const OrderModel = require('../models/order.model'); // Import OrderModel



describe('getOrderById', () => {
    it('should return the order details for a valid order ID', async () => {
        const orderId = '654d9f915789041c12698d8a';
        const expectedOrder = {
            _id: orderId,
            productId: 'HAV_2839',
            item_name: 'washing Machine',
            quantity: 2,
            Price: 50000,
            createdAt: '2023-11-10T22:17:19.956+00:00',
            serviceName: { name: 'Home Appliences' }
        };

        const aggregateSpy = jest.spyOn(OrderModel, 'aggregate');
        aggregateSpy.mockResolvedValue([expectedOrder]);

        const response = await request(app)
            .get(`/api/v1/order/get?id=${orderId}`)
            .expect(200);


        expect(response.body.status).toEqual(200);
        expect(response.body.message).toEqual('Data fetched successfully');
        expect(response.body.resp).toEqual([expectedOrder]);

        aggregateSpy.mockRestore();
    });

    it('should return an error for an invalid order ID', async () => {
        const invalidOrderId = '654d9f915789041c12698d56';

        jest.spyOn(OrderModel, 'aggregate').mockResolvedValue([]);

        const response = await request(app)
            .get(`/api/v1/order/get?id=${invalidOrderId}`)
            .expect(400);

        expect(response.body.status).toEqual(400);
        expect(response.body.message).toEqual('Error feching the order!');
    });
});
