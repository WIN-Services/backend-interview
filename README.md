# Order Service
This a simple CRUD REST Orders Management API . Tech Stack NodeJS/ Express / MonogDB

## Requirements
- Node.js
- MongoDB cluster or Docker and Docker compose

```
//on local
git clone 
cd backend-interview
npm install
```
Make sure you have MongoDB installed and running.
Update the mongo db uri in .env For Example

IF using docker then no need for mongodb installed and running on system.
Update the mongo db uri in .env

## Test

npm run testcase

## API Endpoints

- `GET /api/v1/order/get-all` - Get all orders;
- `GET /api/v1/order/get?id=` - Get a order details by ID.
- `POST /api/v1/order/add` - Create a new order.
- `PUT /api/v1/order/update` - Update an existing order(Not Allowed  within 3 hrs of existing order)
- `DELETE /api/v1/order/remove` - Delete a order.


Collections:
1. Orders
  - _id (ObjectID)
  - productId: String 
  - item_name: String
  - quantity: Number
  - Price: Number
  -service: Array of ObjectIds (references "Services" collection) 

2. Service
  - _id (ObjectID)
  - name: String [required , unique] 

  ## Assumptions made
  - No authentication required
  - No HTTPS server required
  - No crud apis for services ( directly ingested using seeder)


  ## Changes for production
  - Horizontal scaling for high avalibility of DB (Eg using replica set)
  - Robust Error Handling and seperate data validation layer as middleware
  - Better Configuration management for different envs 
  - Keeping this app internal in private vpc behind load balancer/ api
  gateway etc. and many more..

  ## Time spent 4.5-5 hrs
