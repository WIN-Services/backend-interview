

const chai = require('chai');
const expect = chai.expect;
const chaihttp = require('chai-http');

const should = chai.should();

const BASE_API_URL = "http://localhost:3000/api/v1";

chai.use(chaihttp);



describe('create order', () => {

    describe('No fields provide', () => {
        it('should return 400', async () => {
            const res = await chai.request(BASE_API_URL).post(`/order`, {});
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('totalfee services address are required');
        });
    })

    describe('On successfully created', () => {
        it('should return 200', async () => {
            const data = {
                totalfee: 1000,
                services: ["63a32fcd5ecd12b2196b9a7b"],
                address: "test address"
            };
            const res = await chai.request(BASE_API_URL).post(`/order`).send(data)
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal("Order Placed Successfully");
        });
    })

})

