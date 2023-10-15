#WIN Order Management System

## Overview

This project is a RESTful API built with Node.js and Express.js, designed to manage users and orders. The application utilizes MongoDB as its database for storing user and order data. It features a set of APIs for user registration, login, updating user profiles, retrieving user information, and deleting user accounts. Additionally, the APIs for orders management include functionalities for adding orders, updating orders, fetching specific orders, retrieving all orders, and deleting orders.

## Features

### User APIs
- **User Registration:** Allows users to create an account by providing necessary information like firstname, lastname, email, gender, dob and password.
- **User Login:** Enables users to authenticate using their registered email and password.
- **Update User Profile:** Allows users to update their profile information such as name, dob, or other details.
- **Get User Information:** Provides an API endpoint to retrieve user details based on authentication.
- **Delete User Account:** Allows users to delete their account, ensuring secure data management.

### Order APIs
- **Add Order:** Users can create new orders by specifying services.
- **Update Order:** Allows users to modify existing orders, subject to certain conditions (e.g., after a specific timeframe).
- **Get Specific Order:** Provides API endpoints to retrieve specific order details based on order IDs.
- **Get All Orders:** Enables users to fetch a list of all orders available in the system.
- **Delete Order:** Allows users to remove specific orders from the database.

### Authentication and Authorization
- **JWT Token Middleware:** Implements JWT (JSON Web Token) based authentication for securing API endpoints.
- **Role-Based Authorization:** Implements role-based access control, ensuring that certain APIs are accessible only to specific roles (e.g., Admins).

## Testing
- **Mocha and Chai:** The project's test suite is created using Mocha as the test runner and Chai for assertions, ensuring robust and reliable test coverage.

## Getting Started
1. **Prerequisites:** Ensure you have Node.js and MongoDB installed on your system.
2. **Installation:** Clone the repository, install dependencies using `npm install`, and configure environment variables.
3. **Database Setup:** Set up your MongoDB database and update the connection string in the .env file.
4. **Run:** Start the server using `npm start`.
5. **Testing:** Run tests using `npm test` to validate the functionality of APIs.
