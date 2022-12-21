

const chai = require('chai');
const expect = chai.expect;
const chaihttp = require('chai-http');

const should = chai.should();

const BASE_API_URL = "http://localhost:3000/api/v1";

chai.use(chaihttp);

describe('create service', () => {

    describe('No fields provide', () => {
        it('should return 400', async () => {
            const res = await chai.request(BASE_API_URL).post(`/createservice`, {});
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('serviceName serviceDescription are required');
        });
    })

    describe('On service created', () => {
        it('should return 200', async () => {
            const data = {
                serviceName: 'test serviceName',
                services: ["63a32fcd5ecd12b2196b9a7b"],
                serviceDescription: "test address"
            };
            const res = await chai.request(BASE_API_URL).post(`/createservice`).send(data)
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal("service created");
        });
    })

})