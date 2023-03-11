const makeApp = require('./app');
const db = require("./util/database");
const request = require('supertest')

let app;

describe("POST /order", () => {

    beforeAll(() => {
        return new Promise( resolve => {
          // Asynchronous task
          makeApp(db)
          .then(res =>{
            app = res
            resolve();
          })
        });
    });

    describe("given a valid order object", () => {
        test("should return status 201 and newly created object data", async () => {
            const arr = [
                {
                    req: {
                        total: 100,
                        services: "test",
                        datetime: "2022-03-11 10:30:50"
                    },
                    res: {
                        statusCode: 201,
                        status: "Success",
                        data:{
                            id: 1,
                            total: 100,
                            services: "test",
                            datetime: "2022-03-11T05:00:50.000Z"
                        }
                    }
                },
                {
                    req: {
                        total: 102,
                        services: "test2",
                        datetime: "2023-03-11 10:30:50"
                    },
                    res: {
                        statusCode: 201,
                        status: "Success",
                        data:{
                            id: 2,
                            total: 102,
                            services: "test2",
                            datetime: "2023-03-11T05:00:50.000Z"
                        }
                    }
                }
            ]

            for(let obj of arr){
                const response = await request(app).post("/order").send(obj.req);
                expect(response.statusCode).toBe(obj.res.statusCode)
                expect(response.body.status).toBe(obj.res.status)
                expect(response.body.data.total).toEqual(obj.res.data.total);
                expect(response.body.data.services).toEqual(obj.res.data.services);
                expect(response.body.data.datetime).toEqual(obj.res.data.datetime);
            }
        })
    })

    describe("given invalid order object", () => {
        test("should return 400 statuscode with appropriate failure message", async () => {
            const arr = [
                {
                    req: {
                        total: 100.1,
                        services: "test",
                        datetime: "2022-03-11 10:30:50"
                    },
                    res: {
                        statusCode: 400,
                        status: "Failure",
                        message: 'Invalid type! total field must be integer',
                        data: null
                    }
                },
                {
                    req: {
                        total: 102,
                        datetime: "2023-03-11 10:30:50"
                    },
                    res: {
                        statusCode: 400,
                        status: "Failure",
                        message: 'Error! services field is not present',
                        data: null
                    }
                },
                {
                    req: {
                        total: 102,
                        services: 100,
                        datetime: "2023-03-11 10:30:50"
                    },
                    res: {
                        statusCode: 400,
                        status: "Failure",
                        message: 'Invalid type! services field must be string',
                        data: null
                    }
                },
                {
                    req: {
                        total: 102,
                        services: "test2"
                    },
                    res: {
                        statusCode: 400,
                        status: "Failure",
                        message: 'Error! datetime field is not present',
                        data: null
                    }
                },
                {
                    req: {
                        total: 102,
                        services: "test2",
                        datetime: "2023-03-11f10:30:50"
                    },
                    res: {
                        statusCode: 400,
                        status: "Failure",
                        message: 'Invalid datetime format! Datetime format must follow YYYY-MM-DD HH:mm:ss format',
                        data: null
                    }
                },
                {
                    req: {
                        total: 102,
                        services: "",
                        datetime: "2023-03-11 10:30:50"
                    },
                    res: {
                        statusCode: 400,
                        status: "Failure",
                        message: 'Invalid type! services field must be string',
                        data: null
                    }
                }
            ]
            

            for(let obj of arr){
                const response = await request(app).post("/order").send(obj.req);
                expect(response.statusCode).toBe(obj.res.statusCode)
                expect(response.body.status).toBe(obj.res.status)
                expect(response.body.data).toEqual(obj.res.data);
                expect(response.body.message).toEqual(obj.res.message);
            }
        })
    })
})