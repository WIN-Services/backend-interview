# WIN Backend Engineering Interview

## Description

Created an express server in nodejs for the use case, utilizing mongoDb as the database using mongoose.

## Higl Level Design

* The service starts at sever.js file. 
* Routes, models and controllers are seggregated into their directories. Middlwares can be added for uee cases like validation or other things so as to separate them from the actual logic.
* Utils directory contains the logger and an error implementation to throw errors in the controller.
* setup directory contains a small script to initalize the DB's when running for the first time post connecting to a new mongo instance.

## Tradeoffs

* None as such, the database I have used is MongoDb.

## Assumptions

* For now the services need to be of only three kinds [123, 456, 789]

## Changes for production

* The tests can be improved a lot
* Should add more validations
* Should add more handling to have some more gracefull errors
* Should tackle more corner cases

## How to run

* Clone this repo
* run npm install
* Add the connection string in local.env and rename it to .env
* run node setup/db_data.js once if you have connected to a new mongodb string 
* run node server.js to start the server
* run npm run test to see the test results

## Parts completed

* Your service should implement several endpoints that accept POST, GET, PUT and DELETE requests. Also 1 endpoint that accepts GET all orders.
* Your service should handle edge cases appropriately and return appropriate HTTP status codes.
* Your service should return an error on creation/updating an order within 3 hrs of a pre-existing order.
* Your service should return JSON results.
* Your service should have at least one test.

## Time spent

* 2-3 Hours

