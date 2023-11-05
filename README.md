# WIN Backend Engineering Interview

# Order Service

This a simple CRUD REST Orders Management API . Tech Stack NodeJS/ Express / MonogDB

## Requirements

- Node.js
- MongoDB server or Docker and Docker compose

## Clone the repository and install dependencies

```
//on local
git clone https://github.com/Naman15032001/order-service
cd order-service
npm install
```

## Set up the MongoDB connection:

Make sure you have MongoDB installed and running.
Update the mongo db uri in .env For Example

```
MONGODB_URI=mongodb://localhost:27017/orders_app
```

IF using docker then no need for mongodb installed and running on system.
Update the mongo db uri in .env

```
MONGODB_URI=mongodb://mongodb:27017/orders_app
```

# Usage

```
npm start
// For Docker
docker-compose build
docker-compose up
```

## Test

npm run test

## Coverage

npm run coverage

# Seed Data 

npm run seed

## API Endpoints

- `GET /order` - Get all orders;
- `GET /order/:id` - Get a order details by ID.
- `POST /order` - Create a new order.
- `PUT /order/:id` - Update an existing order
                     (Not Allowed  within 3 hrs of existing order)
- `DELETE /order/:id` - Delete a order.

## Database Design
service: order-service
Database: orderdb

Many to Many relationship between Orders <-> Services

Collections:
1. Orders
  - _id (ObjectID)
  - order_id: String [required, unique]  (INDEXED FIELD)
  - datetime: Date [default: current date and time]
  - totalfee: Number
  - services: Array of ObjectIds (references "Services" collection) 

2. Service
  - _id (ObjectID)
  - service_id: String [required, unique]
  - name: String [required , unique] 
  
## Download Postman Collection

[Download file](order_service.postman_collection.json)


## Trade-offs made
  - Security aspect of the project 
  - Pagination not added in get all orders in api 
  - Instead of embedding use REF in DB design ( will save space but 
    additional quering)
  - For the scope of this project kept simple Schema


## Assumptions made
  - No authentication required
  - No HTTPS server required
  - No crud apis for services ( directly ingested using seeder)

## Changes for production
  - Observability and Monitoring integration (Eg Datadog)
  - Horizontal scaling of this app (Eg HPA in kubernetes)
  - Horizontal scaling for high avalibility of DB (Eg using replica set)
  - Robust Error Handling and seperate data validation layer as 
    middleware
  - Better Configuration management for different envs 
  - Keeping this app internal in private vpc behind load balancer/ api
    gateway etc. and many more..


## What parts of spec were covered
=============================== Coverage summary ===============================

- Statements   : 91.17% ( 155/170 )
- Branches     : 64.86% ( 24/37 )
- Functions    : 83.33% ( 20/24 )
- Lines        : 92.21% ( 154/167 )


## Time spent 4-5 hrs 
