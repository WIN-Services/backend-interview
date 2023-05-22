# WIN Backend Service

## Steps to run:
1. Copy ```.env.example``` to ```.env``` and edit according to original credentials <keys already present in .env but not recommended for security issues. Credentials should be in .env file and not pushed to github>
2. Run ```npm i && npm run script``` (npm i for installing dependencies and npm run script for populating the data into database)
3. ```npm start``` for starting the server
4. ```npm run test``` for running the test cases


## Deliverables

There are two deliverables of the project:

1. An internal web service API for managing orders
2. A test suite to validate the web service and library work as expected

### General

- Languages used **JavaScript**.
- Framework used **Express**.
- Database used **MongoDB**
- Middleware used **Bearer {token}**
- Models created **Orders & Services**

### Web Service

- The service contains 2 layers and maine server file (server.js)

    **1. App Layer containing the routes, controllers, services and utilities related to App**

    **2. DB layer containing the db connection and configurations**

- The service contains several endpoints that accept POST, GET, PUT and DELETE requests. Also 1 endpoint that accepts GET all orders.
- The service uses a middleware as auth for authenticating the request
- The service returns proper JSON results and status codes 
  **Eg: Network Code : 200OK**
    **JSON response:{"success": true,"message": "Order Fetched Successfully!","data": <data>}**
- The service should returns an error on creation/updating an order within 3 hrs of a pre-existing order.
- The service contains tests (npm run test)



## Credentials
- Postman Collection : **https://api.postman.com/collections/8277369-1240f881-71ed-43de-88c2-c02d2caaa586?access_key=PMAT-01H12K7532EFTXJ5V9CZC9AM5T**
