# WIN Backend Assignment Solution
# by Dattatray Niture

## description
- so as given in assignment I have created project using below technology
- Node.js 
- Express.js (framwork for node.js)
- MongoDB (database)
- mongoose (it is library used to create connection between MongoDB and the Node.js)
- moment-timezone (used to manage dates)
- dotenv (this module used to load environment variables from a .env file into process.env)
- joi (this library is used to provide validator for request object and object schema description )
- chai-http, mocha, chai, supertest (these testing library used for testing)

## intro of project
- in this project we can create services, with unique name, and also we can updated status of services to make them available or unavailable
- in orders we can order for different services so here we can create orders, update orders, get orders and delet orders
- if you create or updated order then you have to wait for 3 hours then after you can perform create/update operation
- in testing for now we are testing for get all orders API only to check status code, and json data format

### Models
-orders Model
```yaml
{
  "_id":{ObjectId, mandatory, unique, bydefault mongodb creats},
  "totalfee": {number, mandatory},
  "is_active": {boolen, default false},
  "services": [
    {
      "serviceId": {ObjectId, reference to services}
    },
  ],
  "created_At": {timestamp}
  "updated_At": {timestamp}
}
```
- services Model
```yaml
{
  "_id":{ObjectId, mandatory, unique, bydefault mongodb creats},
  "fees": {number, mandatory},
  "is_active": {boolen, default false},
  "created_At": {timestamp}
  "updated_At": {timestamp}
}
```
## services APIs
### POST /api/service
- request body
```yaml
{
    "name":"analtutic",
    "fees":"122"
}
```
- responce erros
```yaml
{
    "error": {
        "msg": "\"fees\" must be a number",
        "code": 400
    }
}
```
- responce body (Json Data)
- status 201
```yaml
{
    "code": 201,
    "message": "service created successfully",
    "data": {
        "serviceDetails": {
            "name": "testing",
            "is_active": true,
            "fees": 100,
            "_id": "656a68a2d8ed6e1cb22c4043",
            "created_At": "2023-12-01T23:13:38.103Z",
            "updated_At": "2023-12-01T23:13:38.103Z",
            "__v": 0
        }
    }
}
```
### PUT /service

- request body (Json Data)
```yaml
{
    "serviceId":"6569a8093d8e870e575dfbce",
    "is_active":true,
    "fees":144
}
```
- responce body (Json Data)
- status 200
- here in update API we are sending updated data so we can check and verify but is realtime we will send only message and status code
```yaml
{
    "code": 200,
    "message": "service updated successfully",
    "data": {
        "serviceDetails": {
            "_id": "6569a8093d8e870e575dfbce",
            "name": "analtutic",
            "is_active": true,
            "created_At": "2023-12-01T09:31:53.607Z",
            "updated_At": "2023-12-01T23:18:19.000Z",
            "__v": 0,
            "fees": 144
        }
    }
}
```

## order APIs 
### POST /api/order
- here we can create order of different service but if we create one order then for next 3 hours we can not create new order or even we can not update existing order

- request body (Json Data)
```yaml
{
    "totalfee":500,
    "services":["6569a96b1fdddf1e7e65a907","6569a9438b41c7fa602c4609","6569a8093d8e870e575dfbce"]
}
```
- error body
- status 400
```yaml
{
    "error": {
        "msg": "order can not create or updated within 3 hrs of a pre-existing order",
        "code": 400
    }
}
```
- responce body
- status 201
```yaml
{
    "code": 201,
    "message": "order created successfully",
    "data": {
        "orderDetails": {
            "totalfee": 500,
            "is_active": true,
            "services": [
                {
                    "serviceId": "6569a9438b41c7fa602c4609"
                },
                {
                    "serviceId": "6569a8093d8e870e575dfbce"
                }
            ],
            "_id": "656a6ecb49b8b8e4c75e8c2b",
            "created_At": "2023-12-01T23:39:55.585Z",
            "updated_At": "2023-12-01T23:39:55.585Z",
            "__v": 0
        }
    }
}
```
### PUT /api/order

- here we can create order of different service but if we create one order then for next 3 hours we can not create new order or even we can not update existing order
- responce body
- status 200
```yaml
{
    "code": 200,
    "message": "order updated successfully",
    "data": {
        "orderDetails": {
            "totalfee": 500,
            "is_active": true,
            "services": [
                {
                    "serviceId": "6569a9438b41c7fa602c4609"
                },
                {
                    "serviceId": "6569a8093d8e870e575dfbce"
                }
            ],
            "_id": "656a6ecb49b8b8e4c75e8c2b",
            "created_At": "2023-12-01T23:39:55.585Z",
            "updated_At": "2023-12-01T23:39:55.585Z",
            "__v": 0
        }
    }
}
```
### GET /register
- here we have used pagination, aslo we provide order posted time duration in second, minutes, hours, days, months
### in filter we are through query parameters
- like orderId,is_active,fees
- responce body
- status 200
```yaml
{
    "code": 200,
    "message": "success",
    "data": {
        "OrdersList": [
            {
                "_id": "656a562e18075c00373ca618",
                "totalfee": 500,
                "is_active": true,
                "services": [
                    {
                        "serviceId": "6569a96b1fdddf1e7e65a907"
                    },
                    {
                        "serviceId": "6569a9438b41c7fa602c4609"
                    }
                ],
                "created_At": "2023-12-02 03:24:54",
                "updated_At": "2023-12-01T21:54:54.598Z",
                "__v": 0,
                "postedDays": "4 minutes ago"
            }
        ],
        "current": 1,
        "total_pages": 4,
        "total_items": 4
    }
}
```
### DELETE /api/order
- here we are sending orderId to delete this order through query parameters
- responce body
- status 200
```yaml
{
    "code": 200,
    "message": "order deleted successfully",
    "data": {
        "deletedOrderId": "656a09a02a86e5049473f6f0"
    }
}
```
### What you would change if you built this for production
- here we can change lots of thing but firstly I will add user implementation and user can login using there username and password so one user when place the order it will not affect on other user so other users don't need to wait for 3 hours if the order is not place by them
- also I will add authentication
### instructions on how to setup the environment to run my project

- 1 clone reposatory
- 2 then you can go inside folder backend-interview run command npm install
- 3 after npm install you can run command npm run dev or node server.js
- 4 then use postman to hit the APi and as shown in above example you can send the body request
- 5 to run the delete API and get API you have to send - parametrs in query params like
- orderId:"656a09a02a86e5049473f6f0",
- is_active:true / false
- 6 while running get all orders API you can use pagination
- limit: 10 (per page 10 documents you can select any number)
- page:1 ( this is the page number)
at bottom you will see total documents , current page

### NOTE
- if you create one order then immediately you can not create next order or also you can not update any order for 3 hours so if you want to create new order immediately then first delete this order
#### put API
- while running update order API
you have to wait for 3 hour as given in assignment but by using mongodb string you can manualy change date from database for testing

## required time
- I have invested 6 hours on that assignment but I enjoyed this time but I have added more features in this assignment

## particular problems I ran into
- no there is no major problem but I take 30 minutes to exactly identuify what I have to do in this assignment
- I havent used chai or any library for testing in my current comapny so it takes time but I learned about this

      - A description of your solution at a high-level, including language used, framework used, roughly how it works, etc.
      - What trade-offs you made
      - Any assumptions you made that affected your solution
      - What you would change if you built this for production
      - Brief instructions on how to setup the environment to run your project
      - What parts of the spec were completed, how much time you spent, and any particular problems you ran into

## Scenario

Your mission is to build a portion of an order management system. You need to provide a service that allows other systems and teams to obtain information about orders.

## Deliverables

There are two deliverables for this project:

1. An internal web service API for managing orders
2. A test suite to validate the web service and library work as expected

### General

- Please use either **JavaScript/TypeScript or Python**.
- You may use any framework, such as a web framework or test framework, to help you complete the project.
- You may store the data for this system in any database you choose, however we've included a Docker image loaded with Postgres in this repo.
- You may model the data any way you'd like, including adding data beyond the samples provided.

### Web Service

- Your service should implement several endpoints that accept POST, GET, PUT and DELETE requests. Also 1 endpoint that accepts GET all orders.
- Your service should handle edge cases appropriately and return appropriate HTTP status codes.
- Your service should return an error on creation/updating an order within 3 hrs of a pre-existing order.
- Your service should return JSON results.
- Your service should have at least one test.

## Sample Data

Below is some sample data you can use to populate your database. Feel free to extend or modify this data for your project:

Service Records

```json
[
  {
    "id": 123,
    "name": "Inspection"
  },
  {
    "id": 789,
    "name": "Testing"
  },
  {
    "id": 456,
    "name": "Analysis"
  }
]
```

Orders

```json
[
  {
    "id": "223",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "123",
        }
    ]
  },
  {
    "id": "224",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "789",
        }
    ]
  },
  {
    "id": "225",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "456",
        }
    ]
  }
]
```

## Duration

Up to 2 hours.

## Submission
1.  Clone this repo
2.  Create Web Services and tests
3.  Submit a Pull Request (PR)
4.  In the PR, include a README that includes the following:
      - A description of your solution at a high-level, including language used, framework used, roughly how it works, etc.
      - What trade-offs you made
      - Any assumptions you made that affected your solution
      - What you would change if you built this for production
      - Brief instructions on how to setup the environment to run your project
      - What parts of the spec were completed, how much time you spent, and any particular problems you ran into

## Evaluation
We are looking for: 
1. Communication
2. Solution Design
3. Completeness
4. Code clarity / readability
