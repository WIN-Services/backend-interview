# Order Management System

## Description

This project implements an order management system with an internal web service API for managing orders. The solution is developed using JavaScript with Node.js and Express for the backend. MongoDB is used as the database, and Mongoose is employed as the ODM (Object Document Mapper).

## How It Works

- **Language Used:** JavaScript (Node.js)
- **Framework Used:** Express
- **Database:** MongoDB with Mongoose

The solution comprises controllers, services, models, and utility classes. The controllers handle HTTP request/response logic, the services encapsulate the business logic and database interactions, and the models define the MongoDB schemas. The `ResponseHandler` class is a utility for consistent formatting of success and error responses.

## Trade-Offs

- For simplicity and quick development, the project uses in-memory storage with MongoDB. In a production scenario, considerations for scalability and performance might lead to different database choices or caching strategies.

## Assumptions

- The provided sample data is used for development and testing.
- The project assumes a single-node MongoDB instance for simplicity.

## Changes for Production

For a production-ready system, consider the following changes:

- Implement proper authentication and authorization mechanisms.
- Use a more robust database setup, such as a MongoDB cluster.
- Implement validation and error handling more comprehensively.

## Environment Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/order-management-system.git

2. Navigate to the project directory:
    ```bash
    cd order-management-system
    npm install
    npm start

3. Ensure a running MongoDB instance. Update the MongoDB connection details in config/database.js
4. The server will be running at http://localhost:7000


## Spec Completion

Web Service API: Implemented CRUD endpoints for orders and services.
Error Handling: Handled edge cases with appropriate HTTP status codes.
Order Creation/Update: Returns an error if creating/updating an order within 3 hours of a pre-existing order.
Response Format: JSON results with a standardized response format.
Testing: Included Jest and Supertest for testing. Basic test cases for orders and services are provided.


## Time Spent

Approximately 2 hours were spent on developing and testing the solution.