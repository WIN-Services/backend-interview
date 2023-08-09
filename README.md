# Description

The Order Management System is a web service API built using Node.js and Express.js. It provides functionality to manage orders and services. The system follows the Model-View-Controller (MVC) architecture and uses a MongoDB database for data storage. It exposes endpoints for retrieving orders and services, as well as creating orders and services.

# Assumptions

The MongoDB server is running locally on the default port.
The system is not handling user authentication.
The focus is on basic CRUD operations for orders and services.

# Changes for Production

For a production-ready version:

Implement user authentication and authorization.
Add thorough validation for incoming data.
Implement comprehensive error handling and logging.
Set up HTTPS for secure communication.

# Environment Setup

Install Node.js and npm.
Clone the repository.
Run npm install to install dependencies.
Set up a MongoDB server locally or provide a valid MongoDB URI in the .env file.
Run npm start to start the server.
Access the API at http://localhost:3000.

# Completion

Implemented basic CRUD operations for orders and services.
Added MVC structure for better code organization.
Implemented a test suite using Mocha, Chai, and Supertest.
Time spent: Approximately 2 hours.
