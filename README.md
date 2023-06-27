# Wallet-management API using NODEJS

## Getting started

This projects includes basic CRUD operation on orders. This project is running on **NodeJs** and **MongoDB** as database.

## Features

- Creation of new order.
- Updation on existing order.
- Fetch of order by id
- Fetch on all recent order.
- Deleting the order.

- Doing CRUD operation on orders.

## Software and framework Requirements

- Express.js
- cors
- dotenv
- mongoose
- express-validator
- Node.js
- MongoDB

## How to setup the project

- Clone the project from github.
- Create .env file in root folder and copy value from infra/development.env into .env file.
- Run npm install.
- Run seeder command to update db with services with command npm seed
- Finally run npm run start.

## Project structure

## Postman collection

Postman collection can be find under the postman folder

## Changes required before deploying it to production:

- Instead of using express.js we can use Nest.js to implement the more robust system.
- Authentication system must be implemented.
- Implementation of logging system.
- User management system should also be implemented.
- More test case should be implemented.

## Test case

We can find test case in the tests folder.
To run the test case, run command : npm test

## Seeder

We need to run the seeder file to seed service data into db.

## Running API server locally

npm run start

## Running API server locally

After following all the step from 'how to install'.
npm run start

## Database

We are using mongodb as a database.We have 2 collections whose schema can be found in /models folder.

### Creating new models

We can create new file in `/models/` and use them in the services.

### Creating new routes

If we need to create more routes then just create a new file in `/routes/` and add it in `/routes/routes.js` with its base path.

### Creating new controllers

If we need to create more controllers then just create a new file in `/controllers/` and use them in the routes.
