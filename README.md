#WIN Order Management System

## Overview

This project is a RESTful API built with Node.js and Express.js, designed to manage orders. The application utilizes MongoDB as its database for storing order and services data.The API for order management include functionalities for adding orders, updating orders, fetching specific orders, retrieving all orders, deleting orders,adding services, updating services, fetching specific services, retrieving all services, and deleting services.

## Features

### Order API
- **Creates Order:** Users can create new orders by specifying services.
- **Update Order By Id:** Allows users to modify existing orders.
- **Get Order By Id:** Provides API endpoints to get order details based on order id.
- **Get All Orders:** Enables users to fetch a list of all orders available in the system.
- **Delete Order By Id:** Allows users to remove specific orders from the database.

### Order API
- **Creates Services:** Users can create new Services by specifying services.
- **Update Services By Id:** Allows users to modify existing Services.
- **Get Services By Id:** Provides API endpoints to get Services details based on Services id.
- **Get All Services:** Enables users to fetch a list of all Services available in the system.
- **Delete Services By Id:** Allows users to remove specific Services from the database.


## Testing
- **Jest and Supertest:** The project's test suite is created using Jest and Supertest.Jest is used for testing the logic of the application, and Supertest is used for testing the application's HTTP endpoints and API routes.

## Getting Started
1. **Prerequisites:** Ensure you have Node.js and MongoDB installed on your system.
2. **Installation:** Clone the repository, and move to `cd backend-interview` install dependencies using `npm install`, and configure environment variables.
3. **Database Setup:** Set up your MongoDB database and update the connection string in the .env file.
4. **Run:** Start the server using `npm run start`.
5. **Testing:** Run tests using `npm test` to validate the functionality of APIs.


## API Endpoints ORDERS ##
- POST /orders : For creating a new order
```http
POST http://localhost:3000/orders/
```

- GET /orders : Retrieve all orders
```http
GET http://localhost:3000/orders/
```

- GET /orders/:id : Get Orders By Id
```http
GET http://localhost:3000/orders/:id 
```

- PUT /orders/:id : Update order's details
```http
PUT http://localhost:3000/orders/:id
```

- DELETE /orders/:id : Delete an order by id
```http
DELETE http://localhost:3000/orders/:id
```

## API Endpoints SERVICES ##
- POST /services : For creating a new services
```http
POST http://localhost:3000/services/
```

- GET /services : Retrieve all services
```http
GET http://localhost:3000/services/
```

- GET /services/:id : Get services By Id
```http
GET http://localhost:3000/services/:id 
```

- PUT /services/:id : Update services's details
```http
PUT http://localhost:3000/services/:id
```

- DELETE /services/:id : Delete an service by id
```http
DELETE http://localhost:3000/services/:id
```


## Status Codes

Following status codes are used in the API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |


## Trade-offs made
  - Pagination not added in get all orders in api 
  - Security aspect of the project 
  - For basic purpose, scalability was not the main focus of this application.


## Assumptions made
  - No authentication required
  - No HTTPS server required
  - No crud apis for services ( used seeder instead)

## Changes for production

- Middleware for Security and Authorization: Implement middleware for security-related concerns, such as rate limiting, CORS (Cross-Origin Resource Sharing) handling, and authentication. Consider integrating an authorization mechanism if access to certain endpoints should be restricted.

- Pagination for Large Datasets: Implement pagination for the getAllOrders endpoint to handle large datasets efficiently. This helps improve response times and reduces the load on the server when dealing with a large number of orders.

- Load Balancing and Scalability: Deploy the API behind a load balancer to distribute incoming traffic across multiple server instances. This improves scalability and fault tolerance.

- HTTPS and SSL/TLS: Enforce the use of HTTPS for secure communication. Set up SSL/TLS certificates to encrypt data in transit and enhance the overall security of the API.


## Time spent 
2-3 hrs 