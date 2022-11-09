const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

require('dotenv').config({
	path: './test/test.env',
});

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('orders API', () => {
	/**
	 * Test GET order by order id
	 */
	describe('GET /get-order/:orderId', () => {
		it('It should order by order id', (done) => {
			const orderId = '222';
			chai
				.request(server)
				.get('/get-order/' + orderId)
				.end((err, response) => {
					response.should.have.status(200);
					const result = response.body;
					result.id.should.equal('222');
					result.totalfee.should.equal(100);
					done();
				});
		});
	});
});
