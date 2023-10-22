# Order Management System

This project is a simplified implementation of an Order Management System with a web service API using JavaScript/Node.js and PostgreSQL as the database.

## High-Level Description

- **Language Used**: JavaScript/Node.js
- **Framework Used**: Express.js for building the web service API
- **Database**: PostgreSQL
- **How it Works**: This project provides a web service API for managing orders and services. It includes endpoints to create, retrieve, update, and delete orders and services. Orders are associated with one or more services, and the system enforces a rule that prevents the creation or update of an order within 3 hours of an existing order. The data is stored in a PostgreSQL database.

## Trade-Offs

- **Simplified In-Memory Storage**: To keep the project focused on the core functionality, an in-memory data storage approach is used. In a production system, it would be replaced with a more robust and scalable database.

- **Basic Error Handling and Validation**: The error handling and validation in this project are minimal. In a production system, comprehensive error handling and input validation would be implemented.

- **Authentication and Authorization**: This project lacks authentication and authorization. In a real-world application, user authentication and authorization would be added to secure the system.

## Assumptions

- **Data Storage**: This project assumes that data is stored in a PostgreSQL database.

- **In-Memory Data Storage**: In-memory data storage is used for simplicity. In production, this would be replaced with a database.

- **Minimal Error Handling**: Basic error handling is implemented for demonstration purposes, but in a production system, more advanced error handling would be required.

## Changes for Production

To make this project production-ready, the following changes are recommended:

- Replace in-memory data storage with a production-ready database (e.g., PostgreSQL or a NoSQL database).
- Implement comprehensive error handling and validation for API requests.
- Add authentication and authorization mechanisms to secure the API.
- Use a process manager (e.g., PM2) for application management.
- Implement containerization with Docker for deployment.

## Setup Instructions

1. **Prerequisites**:
   - Node.js installed.
   - PostgreSQL database set up.

2. **Database Configuration**:
   - Create a PostgreSQL database.
   - Update the database connection details in `src/db.js` with your actual database credentials.

3. **Install Dependencies**:
   - Open a terminal in the project directory.
   - Run `npm install` to install project dependencies.

4. **Run the Application**:
   - Start the server by running `npm start`.
   - The application will run on http://localhost:3000 by default.

## Spec Compliance

- The project implements the required API endpoints for creating, retrieving, updating, and deleting orders and services.
- The project enforces the rule that prevents creating or updating an order within 3 hours of an existing order.
- Unit tests are included in the `test/` directory.

## Time Spent and Challenges

- Time Spent: Approximately 3 hours to create the core project structure, implement the API, write tests, and prepare the README.
- Challenges: The primary challenge was ensuring the correct implementation of the in-memory data storage, creating the database schema, and handling order creation/updation time checks.
