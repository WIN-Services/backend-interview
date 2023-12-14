# Order Management System

## Description

This project implements an order management system with an internal web service API for managing orders. The solution is developed using JavaScript with Koa.js for the backend. Postgres is used as the database. Knex is used for creating initial migrations. Jest and Supertest is used for testing. Zod is used for schema parsing.

## Working

- **Language Used:** JavaScript (Node.js)
- **Framework Used:** Koa.js
- **Database:** Postgres

The solution comprises handlers, services, modals, and stores. The handlers handle HTTP request/response logic, the services and store take care of the business logic and database interactions.

## Assumptions

- For now created user-type as Admin and user for authentication can be changed according to needs
- The provided sample data is used for development and testing.

## Environment Setup

1. Clone the repository:

2. Navigate to the project directory:
   ordermanagement
    yarn
    yarn dev

3. Ensure a running posthres instance. Update the postgres connection details in config/dbconfig.ts
4. The server will be running at http://localhost:3000

## Task Completed
Web Service API: Implemented CRUD endpoints for orders.
Error Handling: Handled edge cases with appropriate HTTP status codes.
Order Creation/Update: Returns an error if creating/updating an order within 3 hours of a pre-existing order.
Response Format: JSON results with a standardized response format.
Testing: Basic test cases for orders are provided.
