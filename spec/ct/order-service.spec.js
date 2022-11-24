const axios = require('axios');

const env = "test";
process.env["environment"] = env;

const app = require("../../app");
const { sequelize, Order, Service } = require("../../db/models");
const config = require("../../config");

const host = `http://127.0.0.1:${config[env]["port"]}/`;

const services = [
    {
      "id": 123,
      "name": "Inspection"
    },
    {
      "id": 456,
      "name": "Analysis"
    }
];

const orders = [
    {
      "id": 223,
      "datetime": "2022-11-01T11:11:11.111Z",
      "totalfee": 100,
      "services": [
          {
          "id": 123,
          }
      ]
    },
    {
        "id": 225,
        "totalfee": 100,
        "datetime": "2022-11-01T12:12:12.111Z",
        "services": [
            {
            "id": 456,
            }
        ]
    }
]

describe("Test main:", function(){

    beforeAll(async function(){
        await app();
    });
    describe("Suite for orders: ", function(){

        beforeAll(async function(){
            await Order.destroy({
                where: {},
                truncate: true
            });
            await Service.destroy({
                where: {},
                truncate: true
            });
        })
    
        describe("Suite for getting orders: ", function(){
    
            beforeAll(async function(){
    
                const order1 = await Order.create({
                    id: orders[0].id,
                    totalfee: orders[0].totalfee,
                    datetime: orders[0].datetime
                });
                const service1 = await Service.create(services[0]);
                await order1.addService(service1);
    
                const order2 = await Order.create({
                    id: orders[1].id,
                    totalfee: orders[1].totalfee,
                    datetime: orders[1].datetime
                });
                const  service2 = await Service.create(services[1]);
                await order2.addService(service2);
            })
    
            it("Test the invalid get request", async function(){
    
                const url = host + "order/100";
                try {
                    const response = await axios.get(url);
                    expect(response).toBeFalsy();
                } catch(error){
                    expect(error).toBeTruthy();
                    expect(error.response.status).toBe(400);
                    expect(error.response.data).toEqual({
                        "error": "Invalid orderId",
                        "data": null
                    });
                }
            });
    
            it("Test the valid get request with orderId", async function(){
    
                const url = host + "order/223";
                try {
                    const response = await axios.get(url);
                    expect(response).toBeTruthy();
                    expect(response.status).toBe(200);
                    expect(response.data).toEqual({
                        error: null,
                        data: {
                            id: 223,
                            datetime: '2022-11-01T11:11:11.111Z',
                            totalfee: 100,
                            services: [{
                                id: 123
                            }]
                        }
                      });
                } catch(error) {
                    expect(error).toBeFalsy();
                }
            });
    
            it("Test the valid get request with all the orders", async function(){
    
                const url = host + "orders";
                try {
                    const response = await axios.get(url);
                    expect(response).toBeTruthy();
                    expect(response.status).toBe(200);
                    expect(response.data).toEqual({
                        error: null,
                        data: [
                            {
                                id: 223,
                                datetime: '2022-11-01T11:11:11.111Z',
                                totalfee: 100,
                                services: [{
                                    id: 123
                                }]
                            },
                            {
                                id: 225,
                                datetime: "2022-11-01T12:12:12.111Z",
                                totalfee: 100,
                                services: [
                                    {
                                        id: 456,
                                    }
                                ]
                            }
                        ]
                      });
                } catch(error) {
                    expect(error).toBeFalsy();
                }
            });
    
            afterAll(async function(){
                await Order.destroy({
                    where: {},
                    truncate: true
                });
                await Service.destroy({
                    where: {},
                    truncate: true
                });
            });
            
        })
    
        describe("Suite for creating orders: ", function(){
    
            it("Test the order creation with invalid data", async function(){
    
                const url = host + "order";
                const payload = {
                    fee: 500
                }
                try {
                    const response = await axios.post(url, payload);
                    expect(response).toBeFalsy();
                } catch(error) {
                    expect(error).toBeTruthy();
                    expect(error.response.status).toBe(400);
                    expect(error.response.data).toEqual({
                        error: "totalfee field should be present",
                        data: null
                    });
                }
            }) 
    
            it("Test the valid order creation request", async function(){
    
                await Service.create(services[0]);
    
                const url = host + "order";
                const payload = {
                    totalfee: 500,
                    services: [
                        {
                            id: 123
                        }
                    ]
                }
                try {
                    const response = await axios.post(url, payload);
                    expect(response).toBeTruthy();
                    expect(response.status).toBe(200);
                    expect(response.data).toEqual({
                        error: null,
                        data: {
                            id: response.data.data.id,
                            totalfee: 500,
                            datetime: response.data.data.datetime,
                            services: [
                                {
                                    id: 123
                                }
                            ]
                        }
                      });
                } catch(error) {
                    expect(error).toBeFalsy();
                }
            });
    
            it("Order created within 3 hours of last order should be rejected", async function(){
    
                await Order.create({
                    totalfee: 200
                });
                await Service.create(services[0]);
                
                const url = host + "order";
                const payload = {
                    totalfee: 500,
                    services: [
                        {
                            id: 123
                        }
                    ]
                }
                try {
                    const response = await axios.post(url, payload);
                    expect(response).toBeFalsy();
                } catch(error) {
                    expect(error).toBeTruthy();
                    expect(error.response.status).toBe(400);
                    expect(error.response.data).toEqual({
                        error: "An order can not be created within 3 hours of an existing order",
                        data: null
                    });
    
                }
            }); 
            
            afterEach(async function() {
    
                await Order.destroy({
                    where: {},
                    truncate: true
                });
                await Service.destroy({
                    where: {},
                    truncate: true
                });
            });
        }); 
    
        describe("Suite for updating orders: ", function(){
    
            it("Test the order updation with invalid data", async function(){
                const url = host + "order";
                const payload = {
                    fee: 500
                }
                try {
                    const response = await axios.put(url, payload);
                    expect(response).toBeFalsy();
                } catch(error) {
                    expect(error).toBeTruthy();
                    expect(error.response.status).toBe(400);
                    expect(error.response.data).toEqual({
                        error: "id field should be present",
                        data: null
                    });
                }
            });
    
            it("Test the order updation with the non present orderId ", async function(){
    
                const url = host + "order";
                const payload = {
                    id: 1000,
                    totalfee: 750,
                    services: [
                        {
                            id: 456
                        }
                    ]
    
                }
                try {
                    const response = await axios.put(url, payload);
                    expect(response).toBeFalsy();
                } catch(error) {
                    expect(error).toBeTruthy();
                    expect(error.response.status).toBe(400);
                    expect(error.response.data).toEqual({
                        error: "orderId does not exist",
                        data: null
                    });
                }
            });
    
            it("Test the valid order updation request", async function(){
    
                const order1 = await Order.create({
                    id: orders[0].id,
                    totalfee: orders[0].totalfee,
                    datetime: orders[0].datetime
                });
                const service1 = await Service.create(services[0]);
                await order1.addService(service1);
                await Service.create(services[1]);
    
                const url = host + "order";
                const totalfee = 750;
                const payload = {
                    id: orders[0].id,
                    totalfee,
                    services: [
                        {
                            id: services[1].id
                        }
                    ]
                }
                try {
                    const response = await axios.put(url, payload);
                    expect(response).toBeTruthy();
                    expect(response.status).toBe(200);
                    expect(response.data).toEqual({
                        error: null,
                        data: {
                            id: orders[0].id,
                            totalfee,
                            datetime: response.data.data.datetime,
                            services: [
                                {
                                    id: services[1].id
                                }
                            ]
                        }
                      });
                    
                } catch(error) {
                    expect(error).toBeFalsy();
                }
            });
            
            it("Order updated within 3 hours of last order should be rejected", async function(){
    
                const order1 = await Order.create({
                    id: orders[0].id,
                    totalfee: orders[0].totalfee
                });
                const service1 = await Service.create(services[0]);
                await order1.addService(service1);
                await Service.create(services[1]);
    
                const url = host + "order";
                const totalfee = 350;
                const payload = {
                    id: orders[0].id,
                    totalfee,
                    services: [
                        {
                            id: services[1].id
                        }
                    ]
                }
                try {
                    const response = await axios.put(url, payload);
                    expect(response).toBeFalsy();
                } catch(error) {
                    expect(error).toBeTruthy();
                    expect(error.response.status).toBe(400);
                    expect(error.response.data).toEqual({
                        error: "An order can not be updated within 3 hours of an existing order",
                        data: null
                      });
                }
            });
    
            afterEach(async function() {
    
                await Order.destroy({
                    where: {},
                    truncate: true
                });
                await Service.destroy({
                    where: {},
                    truncate: true
                });
            });
    
        });
    
        describe("Suite for deleting orders: ", function(){
    
            it("Test the invalid order delete request", async function(){
                const url = host + "order/1000";
                try {
                    const response = await axios.delete(url);
                    expect(response).toBeFalsy();
                } catch(error) {
                    expect(error).toBeTruthy();
                    expect(error.response.status).toBe(400);
                    expect(error.response.data).toEqual({
                        error: "orderId does not exist",
                        data: null
                      });
                }
            });
    
            it("Test the valid order delete request with orderId", async function(){
    
                const order1 = await Order.create({
                    id: orders[0].id,
                    totalfee: orders[0].totalfee
                });
                const service1 = await Service.create(services[0]);
                await order1.addService(service1);
    
                const url = host + `order/${order1.id}`;
                try {
                    const response = await axios.delete(url);
                    expect(response).toBeTruthy();
                    expect(response.status).toBe(200);
                    expect(response.data).toEqual({
                        error: null,
                        data: "Order is successfully deleted"
                      });
                    
                } catch(error) {
                    expect(error).toBeFalsy();
                }
            });
        });
    });
    
    describe("Suite for services: ", function(){
    
        beforeAll(async function(){
    
            await Service.destroy({
                where: {},
                truncate: true
            });
        });
    
        it("Test the service creation for invalid request", async function(){
    
            const url = host + "service";
            const payload = {
                name1: "test service"
            }
            try {
                const response = await axios.post(url, payload);
                expect(response).toBeFalsy();
            } catch(error) {
                expect(error).toBeTruthy();
                expect(error.response.status).toBe(400);
                expect(error.response.data).toEqual({
                    error: "name field should be present",
                    data: null
                });
            }
        });
    
        it("Test the valid service creation request", async function(){
    
            const url = host + "service";
            const name = "test service";
            const payload = {
                name
            }
    
            try {
                const response = await axios.post(url, payload);
                expect(response).toBeTruthy();
                expect(response.status).toBe(200);
                expect(response.data).toEqual({
                    error: null,
                    data: {
                        id: response.data.data.id,
                        name
                    }
                });
            } catch(error) {
                expect(error).toBeFalsy();
            }
        });
    
        it("Test the valid get request with all the services", async function(){
    
            await Service.create(services[0]);
            await Service.create(services[1]);
    
            const url = host + "services";
    
            try {
                const response = await axios.get(url);
                expect(response).toBeTruthy();
                expect(response.status).toBe(200);
                expect(response.data).toEqual({
                    error: null,
                    data: [
                        {
                            id: 123,
                            name: "Inspection"
                          },
                          {
                            id: 456,
                            name: "Analysis"
                          }
                    ]
                });
            } catch(error) {
                expect(error).toBeFalsy();
            }                
        });
    
        afterEach(async function(){
            await Service.destroy({
                where: {},
                truncate: true
            });
        });
    });

});

