// Require supertest module
const request = require('supertest');
const {app} = require('./server');

describe('OrderManagement', function () {
    it('get order by id',  () => {
        request(app)
            .get('/orderManagement/?id=63a332ad0575f2981c85fb1e')
            .expect(202)
            .then((res) => {
                expect(res.body).toBe({
                    "status": 0,
                    "message": "order fetched successsfully.",
                    "data": {
                        "_id": "63a332ad0575f2981c85fb1e",
                        "dateTime": "2022-12-21T18:06:02.348Z",
                        "totalFee": "300",
                        "services": [
                            {
                                "id": "63a3347941a7aa08b960cc5d"
                            }
                        ],
                        "__v": 0
                    }
                })
            })
    }) 
});
