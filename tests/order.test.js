const request = require('supertest');
const app = require('../server');

describe('Order APIs', () => {
    const validToken = 'eyJhbGciOiJIUzI1NiJ9.MTIz.VqiOj5k3eEyVMnhJ7e21w_a2iaFRhp3JdvWoJUlo1oA';
    const invalidToken = 'eiOiJIUyJhbGczI1NiJ9.MTIz.5k3eEy7e21wVMnhVqiOjJ_aJdvWoJUlo1oA2iaFRhp3';

    // JWT Authentication check 
    it('create an order with invalid auth_token', async () => {
        const res = await request(app)
            .post('/api/order')
            .set('Authorization', invalidToken)
            .send({
                status: "OPEN",
                description: "Tap leaking",
                totalFee: 100
            });
        expect(res.statusCode).toEqual(401);
    });

    // create
    it('create an order', async () => {
        const res = await request(app)
            .post('/api/order')
            .set({ 'Authorization': validToken })
            .send({
                status: "OPEN",
                description: "Tap leaking",
                totalFee: 100
            });
        expect(res.statusCode).toEqual(200);
    });

    // create Order with wrong payload
    it('create an order with wrong payload', async () => {
        const res = await request(app)
            .post('/api/order')
            .set({ 'Authorization': validToken })
            .send({
                status: "OPEN",
                description: "Tap leaking",
                fee: 100
            });
        expect(res.statusCode).toEqual(400);
    });

    // Create Order within 3 hrs
    it('create an order within 3hrs of creating previous order', async () => {
        const res = await request(app)
            .post(`/api/order`)
            .set({ 'Authorization': validToken })
            .send({
                status: "OPEN",
                description: "Tap leaking",
                totalFee: 100
            });
        expect(res.statusCode).toEqual(422);
    });

    // update Order within 3 hrs
    it('update an order within 3hrs of creating previous order', async () => {
        const orderId = 1;
        const res = await request(app)
            .put(`/api/order/${orderId}`)
            .set({ 'Authorization': validToken })
            .send({
                status: "OPEN",
                description: "Tap leaking",
                totalFee: 100
            });
        expect(res.statusCode).toEqual(422);
    });

    // get Order by Id
    it('get order by Id', async () => {
        const orderId = 1;
        const res = await request(app)
            .get(`/api/order/${orderId}`)
            .set({ 'Authorization': validToken });
        expect(res.statusCode).toEqual(200);
    });

    // get All Orders with pagination
    it('get All Orders with pagination', async () => {
        const res = await request(app)
            .get(`/api/order`)
            .set({ 'Authorization': validToken });
        expect(res.statusCode).toEqual(200);
    });

    // delete an order by Id
    it('delete an order by Id', async () => {
        const orderId = 1;
        const res = await request(app)
            .delete(`/api/order/${orderId}`)
            .set({ 'Authorization': validToken });
        expect(res.statusCode).toEqual(200);
    });

});