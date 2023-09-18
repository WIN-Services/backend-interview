# WIN Backend Assessment

This project is an internal web service API for managing orders. It allows other systems and teams to obtain information about orders.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
- [Commands to start server](#commands-to-start-server)
- [Commands to test server](#commands-to-test-server)
- [ENV Variable](#env-variable)

## Features

- Create, Read, Update, and Delete (CRUD) operations for orders.
- Get a list of all orders.
- Prevent the creation or updating of orders within 3 hours of a pre-existing order.
- Error handling with appropriate HTTP status codes.
- Data stored in a MongoDB database.
- JSON response format.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose

## API Endpoints

You can explore and test the API endpoints using Postman. Click the "Run in Postman" button below:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/12419873/2s9YC8uVTs)

## Commands to start server

```bash
npm i
```
```bash
npm start
```

## Commands to test server

```bash
npm run test
```

## ENV Variable

```bash
- PORT=
- MONGODB_URI=
```
