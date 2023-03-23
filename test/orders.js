let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../dist/server');
let should = chai.should();

chai.use(chaiHttp);

describe("Order APIs",()=>{
    describe("GET API order",()=>{
        describe("/GET all order",()=>{
            it("Should fetch all the order in the DB",(done)=>{
                chai.request('http://localhost:3000').get("/api/v1/orders").
                end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data')
                    res.body.data.should.be.a('array')
                    res.body.data[0].should.be.a('object')
                    res.body.data[0].should.have.property('id')
                    res.body.data[0].should.have.property('totalFee')
                    res.body.data[0].should.have.property('userId')
                    res.body.data[0].should.have.property('isDeleted')
                    res.body.data[0].should.have.property('orderedOn')
                    res.body.data[0].should.have.property('updatedOn')
                    res.body.data[0].should.have.property('services')
                    done();
                })
            })
        })
        describe("/GET all orders for user",()=>{
            it("Should fetch all the orders of users in the DB",(done)=>{
                chai.request('http://localhost:3000').get("/api/v1/orders/3").
                end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data')
                    res.body.data.should.be.a('array')
                    res.body.data[0].should.be.a('object')
                    res.body.data[0].should.have.property('id')
                    res.body.data[0].should.have.property('totalFee')
                    res.body.data[0].should.have.property('userId')
                    res.body.data[0].should.have.property('isDeleted')
                    res.body.data[0].should.have.property('orderedOn')
                    res.body.data[0].should.have.property('updatedOn')
                    res.body.data[0].should.have.property('services')
                    done();
                })
            })
        })
    })
})