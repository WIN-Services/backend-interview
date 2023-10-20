# Order Management App

### Author Details
> Mohd Ammad Rehman

> Email: marehman0211@gmail.com

## Scenario

- To build a portion of an order management system. 
- You need to provide a service that allows other systems and teams to obtain information about orders.

## Deliverables

There are two deliverables for this project:

1. An internal web service API for managing orders
2. A test suite to validate the web service and library work as expected

## Environment
- **Language :** JavaScript
- **Framework :** ExpressJs running on the top of NodeJS
- **DataBase :** PostgreSQL
- **ORM :** Sequilize
- **Testing Framework :** Jest

### Tools versions:
- **Node :** v20.6.1 (Latest)
- **Express :** v4.18.2
- **PostgreSQL :** v4.18.2
- **Jest :** v29.7.0
- **SuperTest :** v6.3.3

## Assumptions
- One order can have multiple Services, but each service belongs to only one Order.
- We need not to allow to create/update an order, if any other order is created within last 3 hrs.
- Service can be created or updated anytime, not blockage of 3 hrs.
- Deletion of an order means, CASCADE delete of it services too.

## Models

> There are 2 entities in our case : Order & Service

> We are assuming that for each order, there can be multiple services

> Order has **one to many** relationship with services

### Orders

```json
{
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED", // current status of the order
  description: STRING, // description about the order, added will creating/updating order
  totalFee: NUMBER, // fee for the order
  createdAt: Date,  // when order was created
  updatedAt: Date // track when this order was last updated
}
```

### Services
> one order can have multiple services, associated with it

> But one service is associated with only one order

```json
{
  name: STRING, // service-name
  description: STRING, // details about the service done
  createdAt: Date, // when service was initiated
  updatedAt: Date // track when this service was last updated
}
```


## Web Service
> RESTful APIs developed for CRUD operations of orders and services

> **3 hrs threshold** for order creation/updation, as expected 

#### GET: /api/order/:orderId
- API to fetch Order details by orderId
#### GET: /api/order?page=1&pageSize=10
- API to fetch All Order details using **pagination**
- by default, page=0 & pageSize=10
#### POST: /api/order
- API to Create a new Order
- **validate** request payload, if it is as expected
- **3 hrs check:** do not allow to create an Order, if any other created in last 3 hrs.
#### PUT: /api/order/:order_id
- API to Update Order by given Id
- **validate** request payload, if it is as expected
- **3 hrs check:** do not allow to update an Order, if any other created in last 3 hrs.
#### DELETE: /api/order/:order_id
- API to delete Order by given Id
- It will CASCADE delete services too.

> Note: replace **order** with **service** in above APIs for CRUD operation of services

### Response Codes
- **200 :** request succefully completed
- **400 :** Invalid Payload from user
- **422 :** Error ocurred, and need to notify user about error **(Ex: not allowing user to create/update order within 3 hr threshold)**
- **500 :** Some error occurred, mostly a system-fault, just log it, and notify user **Internal Server Error**

### Architecture
>Flow when request hit our server: 

server -->  authentication_middleware(JWT-verification) --> Payload Verification(if any) --> BuisnessLogic Verification(if any) --> DB-query --> response ready to send back

>From file aspect:

server.js -> middleware -> controller-layer -> service-layer -> database-layer -> service-layer -> controller -> server.js


## Test Suite
- Using JEST with SuperTest for Unit-Testing
- all test-cases written in ```/tests/*``` folder
- We have covered all the test cases for order-REST APIs, and it will be somewhere similar for service-API
- We are validating the expected status-code right now.

#### Test-cases covered:
- create an order with invalid auth_token
- create an order
- create an order with wrong payload
- create an order within 3hrs of creating previous order
- update an order within 3hrs of creating previous order
- get order by Id
- get All Orders with pagination
- delete an order by Id

> Successfully achieved **90%+ coverage** (except, REST APIs-service)


## Additional Features
### JWT Verification - Security Aspect
- added auth **MiddleWare** in each API, for authentication of valid user
- validation is done using JWT
>app>middlewares>auth.js
### Validation using JOI
- for each create and update we valid the request-payload
- We can validate at initial level itself, if expected request is coming or not?
>app>validations>index.js
### Sequilize ORM
- To improvise DB-Security, avoiding possible SQL-injections attack

## How to run
#### Step 1:
- Clone repository and install dependency
```yarn install``` or ```npm i```
> Make sure, your node-version is latest: 20

#### Step 2:
- Make a .env file, use example from **.env.example**
- Update DB_Details, PORT to run
- make sure to use same JWT_INTERNAL_TOKEN, or you need to use different access-token

#### Step 3:
- run SQL-migration to create tables in DB
```npm run migrate```

#### Step 4:
- run the server
- ```npm run start``` or ```node server.js```

#### Step 5:
- For using any API, pass this for authentication purpose:
- ```'Authorization': 'd2he3qb3g7rprsbfebfhyq73r'```

>> You are ready to use order-management service

### Use Test Suite:
> Please ensure .env for test environment, also add TEST_DB_NAME
#### To run all test cases:
```npm run test```

#### To see whole test coverage:
```npm run coverage```

### Use Test Suite:
> Please ensure .env for test environment, also add TEST_DB_NAME
#### To run all test cases:
```npm run test```

#### To see whole test coverage:
```npm run coverage```


## Future Scope
- Add user details, and make roburst Auth-system
- To cover test cases over REST APIs for Service-model
- Improvise test-cases for more roburst system, validation over data.
- Update models, and more interacting APIs as per real-life application and requirement.

>> Please feel free to reach out to me, for any clarification and suggestions
