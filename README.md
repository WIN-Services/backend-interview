# WIN Backend Engineering Interview 
Submitted by Roshan Kumar Sharma

## High level description of solution

This project is a segment of an Order Management System implementation. Users can engage with the service by performing CRUD operations. They can create a profile using their name, email, and date of birth. A unique ID is assigned to each user, which can be later used for creating orders. Users are able to establish services within the system. Moreover, users have the capability to request orders for any available service. Subsequent orders for the same service can be placed only after a 3-hour interval from the previous order. Additionally, modifications to any order can be made after a 3-hour time lapse from its initial placement.

## Languages & frameworks used

Language: JavaScript (NodeJS)
Framework: ExpressJS
Database: MongoDB
Testing: supertest and jest
Other important npm packages: moment-timezone, zod

### How it works

1. Create User for using the endpoint 
POST http://<host>:<post>/api/v1/users/createUser

2. Create Services for which orders can be placed using the endpoint
POST http://<host>:<post>/api/v1/services/createService

3. Get the list of created services using the enpoint
GET http://<host>:<post>/api/v1/services/getServices?limit=0&offset=0

4. Create Order using the endpoint 
POST http://<host>:<post>/api/v1/orders/createOrder

5. Get the list of created orders using the enpoint
GET http://<host>:<post>/api/v1/orders/getOrders/<user_id>?limit=5&offset=0

6. Update the details of Order using the endpoint
PUT http://<host>:<post>/api/v1/orders/updateOrder/<user_id>/<order_id>

7. Delete any order using the endpoint
DELETE  http://<host>:<post>/api/v1/orders/deleteOrder/<user_id>/<order_id>

### Trade-offs

1. There is potential to enhance error handling and response formatting.
2. Validation and management of payload and request body data could be optimized.
3. Incorporating additional test cases for endpoints would be beneficial.
4. Refining and optimizing the business logic for APIs could yield improved outcomes.

## Assumptions

1. Enhancing user onboarding would enhance project clarity. Users can conveniently place orders for available services.
2. Conducting tests with users from various regions could validate the system's global usability. Given the stipulation of a 3-hour gap for placing or modifying orders, handling timezones and calculations accurately is pivotal.

## Changes for production
1. Introducing authentication and authorization mechanisms would significantly bolster security measures.
2. Refining the logic behind ID generation for users, services, and orders would lead to a more robust system.
3. Focusing on proper error handling and response formatting would enhance user experience.
4. Implementing data encryption and decryption during client-server communication is crucial for data protection.
5. Streamlining and optimizing the business logic for APIs would enhance overall efficiency.

## Environment setup to run project
1. Clone the repository
2. Navigate to the directory through CLI and run `npm i` 
3. Create .env file with content 
PORT=8080
DB_URI=mongodb://localhost:27017 (or Mongodb Atlas connection URI)
DB=test
[
  make sure mongodb service is running in your local system: 
  Linux: sudo systemctl status mongod
]
4. Run the command to start the program `npm run start:dev`
5. Run `npm run test` to run the test cases.
6. Use the file rest.http to hit and test the APIs in the vscode rather copy pasting the urls in postman

## Specification completed and problems

1. All the requirement mentioned are completed in this project. It took me 5 hours to completely build the project with every APIs and test cases.