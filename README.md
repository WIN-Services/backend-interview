# Order Management for Win Homes Inspection - NodeJs+PostgreSQL

Application exposes CRUD API endpoints for Service and Order model. 

## Features
- Any one can perform CRUD operations on Service and Order tables
- Application uses SQL database - PostgreSQL to create service and order tables
- Have Dockerfile to test application using docker
- Service with unique names can be created
- Anyone can place Order for each service with the contraint they can update if after 3 hrs of time
- Includes test cases for Service and Order.
- Include to dockerfile test the App 

## Environment
- NodeJs [v18+](https://nodejs.org/en/download/)
## Packages used
- Express [v4.18.2](https://www.npmjs.com/package/express) - FLEXIBLE Node.js WEB APPLICATION FRAMEWORK
- Sequelize [v6.6.4](https://www.npmjs.com/package/sequelize) - ORM
- PostgreSQL [v8.6.0](https://www.npmjs.com/package/pg) -> SQL DATABASE
- Jest [29.7.0](https://www.npmjs.com/package/jest) - TEST FRAMEWORK

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependancies. In the root folder run below command.

```bash
npm install
```

## Usage
To run server run

```bash
npm start
```

Else 
- To start your server, run `node server.js`.  Open up your favorite browser and navigate to http://localhost:4000/ and you should see "Hello World!".

Fix eslint of javascript files
```bash
npm run lint:fix
```
## Run with Docker
Build the docker image
```bash
docker build -t order-management-wh .
```
Run the docker image 
```bash
docker run -d -p 4000:4000 order-management-wh
```

## Folder Structure

```
  ├───config
  ├───controller
  ├───middlewares
  ├───models
  ├───routes
  ├───test
  └───constants.js
```

- config - Managing DB connection
- controller - Business logic for order and services
- models - Schema definition for order and services
- routes - API path exposed in the network
- test - Specs of Order and Service Module
- middlewares - Middlewares to check request and response
- constants - App constants


## Assumptions
1. There is no authentication in the APIs.
2. Application uses postgresql
3. One order belongs to one service only
4. Since order and services are less, there is not pagination and all orders/services will be fetched at once

## Future/Production Scope

Add authentication and authorisation layer in the application. Pagination to be included in all the fetch APIs.