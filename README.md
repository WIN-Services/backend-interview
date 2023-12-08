# Order Management System

## Overview

This project implements an Order Management System with a web service API using Node.js, Express, and MongoDB. The system allows for creating, updating, deleting, and retrieving orders. The API also enforces a constraint preventing the creation or updating of an order within 3 hours of a pre-existing order for the same **service**.

## Technology Stack

- Language: JavaScript (Node.js)
- Framework: Express.js
- Database: MongoDB with Mongoose
- Testing: Mocha, Chai

## How it Works

The system provides a set of endpoints for managing orders:

- `POST /api/orders`: Create a new order
- `GET /api/orders`: Get all orders
- `GET /api/orders/:id`: Get order by ID
- `PUT /api/orders/:id`: Update order by ID
- `DELETE /api/orders/:id`: Delete order by ID

The system uses a MongoDB database to store orders and service records. Mocha and Chai are employed for testing the functionality of the web service.

## Trade-offs

1. **Data Model:** The data model uses MongoDB, a NoSQL database. This decision provides flexibility but sacrifices some relational structure.

2. **Testing:** The test suite covers basic functionality. In a production scenario, more comprehensive testing, including edge cases, would be necessary.

## Assumptions

1. Service records are assumed to be predefined and exist in the database.

## Changes for Production

For a production environment, consider the following improvements:

1. **Security:** Implement authentication and authorization mechanisms.

2. **Logging:** Enhance logging for better monitoring and debugging.

3. **Scalability:** Evaluate and optimize for scalability, considering factors like database sharding.

## Setup

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the MongoDB database.
4. Run the application: `npm start`

## Environment Configuration

For testing purposes, a sample `.env` file has been provided in the root of the project. This file includes configuration variables such as `PORT` and `MONGO_URL`. However, it's important to note that:

- **This `.env` file is for testing purposes only.**
- **Do not include sensitive information or real production values in this file.**
- **Always use secure and private configurations for production environments.**

Before running the application, make sure to create your own `.env` file with the appropriate configuration for your development or testing environment. Ensure that the `.env` file is added to your project's `.gitignore` to avoid accidentally committing sensitive information to version control.



## Spec Compliance and Time Spent

- **Spec Compliance:** All specified endpoints are implemented, including the constraint on order creation/update.
- **Time Spent:** Approximately 2 hour 40 minutes.

## Challenges 
- **Testing Implementation:** As a developer not entirely comfortable with testing libraries, I encountered challenges in effectively implementing the test suite using Mocha and Chai. This led to a revision of my testing concepts and a deeper exploration of these libraries to ensure the reliability and correctness of the tests.

