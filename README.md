# Order Management System

### Language: 
JavaScript

### Framework: 
Express

## Description

This project implements an Order Management System, providing a RESTful API for managing orders and service records. The system is built using JavaScript/ES6 and the Express framework for the backend. MongoDB is used as the database to store order and service record data.

The system offers the following features:

- Creating, retrieving, updating, and deleting orders.
- Creating, retrieving service records.
- Validating order creation and preventing the creation of orders within 3 hours of a pre-existing order.
- Handling edge cases and returning appropriate HTTP status codes.
- Returning JSON results for all endpoints.

## Trade-offs

- To simplify the implementation, the system may not fully adhere to security best practices or comprehensive error handling.
- The system currently provides a basic set of CRUD operations, and further functionalities could be added for a production-ready solution.

## Changes for Production

For a production-ready version of this system, the following improvements should be considered:

- Implement user authentication and authorization to secure the API endpoints.
- Implement comprehensive error handling and logging.

## Getting Started

1. Clone the project repository.
2. Ensure that MongoDB is running on your local machine or update the MongoDB connection string in the project's configuration.
3. Install the project's dependencies using `npm install`.
4. Start the server using `npm start`.

## Completed Specification

- Created a RESTful API for managing orders and service records.
- Implemented CRUD operations for orders and service records.
- Validated order creation and prevented orders from being created within 3 hours of a pre-existing order.
- Handled edge cases and returned appropriate HTTP status codes.
- All endpoints return JSON results.
- Included basic error handling and provided appropriate error responses.

## Time Spent

The project was completed within the specified time limit of 2 hours.

## Problems Faced

While developing the project, a few challenges were encountered, such as implementing error handling and ensuring that the MongoDB database was correctly configured and connected. However, these challenges were successfully addressed during the development process.
