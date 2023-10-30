# Order Management System

This project is a simplified implementation of an Order Management System with a web service API using JavaScript/Node.js and MongoDB as the database.

## High-Level Description

- **Language Used**: JavaScript/Node.js
- **Framework Used**: Express.js for building the web service API
- **Database**: MongoDB
- **Database ODM**: Mongoose
- **How it Works**: This project provides a web service API for managing orders and services. It includes endpoints to create, retrieve, update, and delete orders and services. Orders are associated with one or more services

## Trade-Offs

- **Simplified In-Memory Storage**: To keep the project focused on the core functionality, an in-memory data storage approach is used. In a production system, it would be replaced with a more robust and scalable database.

- **Basic Error Handling and Validation**: The error handling and validation in this project are minimal. In a production system, comprehensive error handling and input validation would be implemented.

- **Authentication and Authorization**: This project lacks authentication and authorization. In a real-world application, user authentication and authorization would be added to secure the system.

## Assumptions

- **Data Storage**: This project assumes that data is stored in a MongoDB database.

- **Minimal Error Handling**: Basic error handling is implemented for demonstration purposes, but in a production system, more advanced error handling would be required.


## Setup Instructions

1. **Prerequisites**:
   - Node.js installed.
   - Mongodb installed.
   
  - **Note if mongodb are not installed then you try using docker**
    - docker installed
    - docker compose installed
    - run the command docker-compose up -d

2. **Database Configuration**:
   - Update the database connection details in `src/models/db.js` with your actual database credentials.

3. **Install Dependencies**:
   - Open a terminal in the project directory.
   - Run `npm install` to install project dependencies.

4. **Run the Application**:
   - Start the server by running `npm start`.
   - The application will run on http://localhost:3000 by default.

5. **Run the Application in Test mode**:
   - Start the test case by running `npm run test`..
