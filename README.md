# Order Management System

## Description
This project entails an order management system featuring an internal web service API for order management. Developed using JavaScript with Node.js and Express, it utilizes MongoDB as the database, with Mongoose serving as the Object Document Mapper (ODM).

## How it works?
The code structure folows MVC architecture with certain modularization and abstraction  techniques applied where necessary. The application is divided into three main components: `model`, `controllers`, `services`.

It provides endpoints for managing orders, including creation, retrieval, updating, and deletion. The system adheres to a RESTful architecture, where each endpoint corresponds to a specific CRUD operation on orders.

This project has two types of API endpoints - Order and Services.

- **Language Used:** NodeJS, JavaScript
- **Framework Used:** Express, JEST
- **Database:** MongoDB with Mongoose ORM


## Environment Setup

To set up the environment and run the project locally, follow these steps:

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/WIN-Services/backend-interview.git
   ```

2. Set up the MongoDB database and update the database connection configuration in the `.env` file with the appropriate connection details. [`.env.production`, `.env.development`, `.env.production`]

3. Navigate to the project directory:
    ```bash
    cd order-management-system
    npm install

4. The server by default will be running at http://localhost:3000  in your browser or postman. You can use this URL to interact with the API. To change the port, we need to change it in repective .env file.

5. Start the dev server:

   ```
   npm run start:[stage]
   ex: npm run start:dev
   ```

6. Test app using the command:

   ```
   npm test
   ```

## Trade Offs
- The current solution was rapidly developed with simplicity in mind, but optimizations will be necessary to accommodate high volumes of production traffic.
- Security considerations were not addressed, as there is no implementation of authentication, authorization, or API keys.

## Assumtions

- **Database:** MongoDB database is used with single Node instance running on 27017 default port.
- **Authentication:** There is no authentication or authorization implemented.
- **Pagination:** No scope for pagination due to less number of records.
- **Sample Data:** The application data modelling is developed following sample data provided.


## Changes for the production

- **Authentication:** There should be authentication to enhance API security using JWT, Bearer Token, etc.
- **Pagination:** Pagination should be used to limit large data withing the single API response to enhance response time.
- **Database:** Use a more robust database setup, such as a MongoDB cluster.
- **Logging:** Implement proper logging mechanism like Winston or Bunyan to log all requests and responses in JSON format.
- **API Gateway:** It works as entry point that manages, routes, and secures incoming and outgoing API traffic between clients and multiple backend services.
- **Caching:** To reduce the response time for the endpoints we can use caching tools like Redis or Memcached.


## Spec Completion and Time Spent

**Spec Completion**: 

- Implemented CRUD endpoints for orders and services in the Web Service API.
- Handled edge cases with appropriate HTTP status codes for error scenarios.
- Implemented error handling to prevent creating or updating an order within 3 hours of a pre-existing order.
- Ensured JSON results with a standardized response format using responseHandler.
- Used Jest and Supertest for testing, providing test cases for orders and services.

**Time Spent**: Approximately 2 hours were spent on designing, developing, and testing the solution.

**Challenges Encountered**: The development process proceeded smoothly without encountering any significant issues.


## Responses for list Orders and Services
Service Records

```json
{
    "success": true,
    "message": "Services fetched successfully",
    "data": [
        {
            "_id": "65d8d222bce817cb0f5fff1c",
            "name": "Testing",
            "createdAt": "2024-02-23T17:09:50.340Z",
            "__v": 0
        },
        {
            "_id": "65d8db95f833a7f6a1ba93eb",
            "name": "Inspection",
            "createdAt": "2024-02-23T17:49:56.355Z",
            "__v": 0
        },
        {
            "_id": "65d8dbaaf833a7f6a1ba93ee",
            "name": "Analysis",
            "createdAt": "2024-02-23T17:49:56.355Z",
            "__v": 0
        }
    ],
    "statusCode": 200
}
```

Orders

```json
{
    "success": true,
    "message": "Orders fetched successfully",
    "data": [
        {
            "_id": "65d8dadaf833a7f6a1ba93e1",
            "datetime": "2023-02-23T01:01:01.001Z",
            "totalfee": 200,
            "services": [
                {
                    "_id": "65d8d222bce817cb0f5fff1c",
                    "name": "Testing",
                    "createdAt": "2024-02-23T17:09:50.340Z",
                    "__v": 0
                }
            ],
            "__v": 0
        },
        {
            "_id": "65d8dae7f833a7f6a1ba93e4",
            "datetime": "2023-02-22T01:01:01.001Z",
            "totalfee": 200,
            "services": [
                {
                    "_id": "65d8d222bce817cb0f5fff1c",
                    "name": "Testing",
                    "createdAt": "2024-02-23T17:09:50.340Z",
                    "__v": 0
                }
            ],
            "__v": 0
        }
    ],
    "statusCode": 200
}
```