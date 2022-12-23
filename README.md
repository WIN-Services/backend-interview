## Description of solution + assumptions
- Many assumptions are made here in order to make the system work. On many routes I've added comments that what could be improved and assuming this or that I've built this route's logic. 
- One of the main assumption is that part of the system is developed and other part of order management is to be added, based on that I've implemented solution around 2 things - `Users & Orders`.
> This backend service will help other teams to manage their users & manage orders created by those users.
## Tech stack
- Nodejs + Javascript
- Express.js
- MongoDB
- Mocha + chai

## High level working overview
- Team members who are outside of the system can access the order management system with the help of the REST Endpoints whose available operations are below:
- Operations available for managing <b>Users</b>:
    - add new users
    - remove existing users
- Operations availabe for managing <b>Orders</b>:
    - users can place new orders
    - users can update existing orders
    - users can cancel/delete previous orders
    - users can fetch all their existing orders

## Trade-offs
- In order to make the system clean and simple I've kept minimalistic database models. If designing on large scale this much data won't be sufficient, there is much room for metadata that could've been collected.
- caching mechanism
- logging service
- auth service


## Production configurations (future aspects)
On this demo we can have basic CRUD functionalities regarding Users and Orders. Still on the backend many things remains before making this a live production ready app. Few of the configurations which I would make are:
- Setup a proper error handling and logging on ELK
- Setup Redis for caching orders
- Use JWT for authorization
- Add authentication methods to check if current user is allowed to use the service.



## Project setup on local

Follow these steps to configure the project on local
###### Pre-requisites
- Up and running mongodb instance on local

###### configure .env file
```
sample:

ENV=dev
PORT=8080

## DB Creds
CS_DB_URL=localhost
CS_DB_PORT=27017
CS_DB_USERNAME=
CS_DB_PASSWORD=
CS_DB_NAME=win-backend
```

###### Install npm dependencies
- cd inside current repository where the package.json file lies.
```
$ npm install
```
###### Start server

```
$ npm start
    OR
$ npm development
```


###### Run tests
```
$ npm test

--- sample output ---

  USERS API Unit Tests:

Database connection fine!
    POST /createTestUsers
      ✔ should add new user to db with valid status & data (40ms)
    POST /removeUserTest
      ✔ should remove newly created user from db


  2 passing (66ms)
```

###### REST Endpoints

- <b>Users</b>
    - POST `/createTestUsers`
    ```javascript
    Creates entry for new user into DB.

    sample request body: 
    {
        "name": "Ravi Pabari",
        "email": "pabariravi12@gmail.com",
        "contact": "9197979797",
        "verificationStatus": true
    }
    ```

    - POST `/removeTestUser`
    ```javascript
    Removes a existing user from DB.

    sample request body:
    {
        "userId": "63a58063d3924778aa29a001"
    }
    ```
- Orders
    - GET `/getOrders`
    ```javascript
    Gets all the existing order for a particular user

    sample request body:
    {
        "userId": "63a58063d3924778aa29a001"
    }
    ```

    - POST `/placeOrder`
    ```javascript
    Creates entry for an order placed by user
    Gives 405 response on duplicate order if same order
    placed in last 3 hours. On successful creation we get 
    new order ID

    sample request body: {
        "userId": "63a58063d3924778aa29a0123",
        "itemId": "63a58063d3924778aa29aabc",
        "quantity": "30",
        "currency": "INR",
        "modeOfTransaction": "UPI",
        "transactionId": "63a58063d3924778aa29xyz"
    }
    ```

    - DELETE `/deleteOrder`
    ```javascript
    Cancels/deletes order from the database
    
    sample request body: {
        "orderId": "63a58063d3924778aa29xyz"
    }
    ```

    - PATCH `/updateOrder`
    ```javascript
    Updates existing order based on the orderId, itemId, item quantity.
    Gives 405 response on duplicate order if same order placed in
    last 3 hours. Updated doc will be returned on successful update.

    sample request body: {
        "orderId": "63a58063d3924778aa29a0123",
        "itemId": "63a58063d3924778aa29aabc",
        "quantity": "30",
        "currency": "INR",
        "modeOfTransaction": "UPI",
    }
    ```


## Solution readiness | What was implemented vs What remains
Solution is working as per the current implementation.
- Implemented
    - Route error handling
    - Users and Orders models
    - CRUD operations around Users and Orders
    - Unit test cases for Users
- Remains
    - sanitaization and proper error handling
    - Unit test cases for Orders
- Problems faced
    - I have't properly done unit testing for APIs so there I took some time in learning them first before implementation.
    - I haven't setup a project from this scratch before so took some time over there as well.
- Time taken
    - Around 8-9 hours including the documentation.