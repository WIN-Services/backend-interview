# WIN Backend Engineering Interview

## Description

Used Node.js for solving the problem statement, along with express framework, for the database I have used AWS DynamoDB.

## High Level Design

Server.js takes a prefix '/dev' indicating that the file is in development phase. In case needed, a production prefix can be created.

All the requests with to '/dev' as prefix will be routed to ordersRouter, which handles the received requests.

ordersRouter(/routes/index.js) contains route handler, which decides where the request will be received based on the path. It takes controller function as argument and will redirect the request to that function. We can add middleware here if we so wish.

The controller takes care of all the database queries for CRUD.

## Tradeoffs

No tradeoff as such. Choice of Database can be one, as I had the freedom to choose one.
My choice may not aligh with the assessment.

## Run the project

1. Clone the repository.
2. run 'npm install' in the cloned directory.
3. You need to start the server.js file using 'node server.js' through terminal/cmd in the project folder.

## Time spent

2-3 hrs

## Parts completed

1. Your service should implement several endpoints that accept POST, GET, PUT and DELETE requests. Also 1 endpoint that accepts GET all orders.
2. Your service should handle edge cases appropriately and return appropriate HTTP status codes.
3. Your service should return an error on creation/updating an order within 3 hrs of a pre-existing order.
4. Your service should return JSON results.
5. Your service should have at least one test.

## Problems faced

Testing is not my best skill, I learnt as much as I could and made the test script.
