# WIN Backend Engineering Interview

## Scenario

Your mission is to build a portion of an order management system. You need to provide a service that allows other systems and teams to obtain information about orders.

## Deliverables

There are two deliverables for this project:

1. An internal web service API for managing orders
2. A test suite to validate the web service and library work as expected

### General

- Please use either **JavaScript/TypeScript or Python**.
- You may use any framework, such as a web framework or test framework, to help you complete the project.
- You may store the data for this system in any database you choose, however we've included a Docker image loaded with Postgres in this repo.
- You may model the data any way you'd like, including adding data beyond the samples provided.

### Web Service

- Your service should implement several endpoints that accept POST, GET, PUT and DELETE requests. Also 1 endpoint that accepts GET all orders.
- Your service should handle edge cases appropriately and return appropriate HTTP status codes.
- Your service should return an error on creation/updating an order within 3 hrs of a pre-existing order.
- Your service should return JSON results.
- Your service should have at least one test.

## Sample Data

Below is some sample data you can use to populate your database. Feel free to extend or modify this data for your project:

Service Records

```json
[
  {
    "id": 123,
    "name": "Inspection"
  },
  {
    "id": 789,
    "name": "Testing"
  },
  {
    "id": 456,
    "name": "Analysis"
  }
]
```

Orders

```json
[
  {
    "id": "223",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "123",
        }
    ]
  },
  {
    "id": "224",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "789",
        }
    ]
  },
  {
    "id": "225",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "456",
        }
    ]
  }
]
```

## Duration

Up to 2 hours.

## Submission
1.  Clone this repo
2.  Create Web Services and tests
3.  Submit a Pull Request (PR)
4.  In the PR, include a README that includes the following:
      - A description of your solution at a high-level, including language used, framework used, roughly how it works, etc.
      - What trade-offs you made
      - Any assumptions you made that affected your solution
      - What you would change if you built this for production
      - Brief instructions on how to setup the environment to run your project
      - What parts of the spec were completed, how much time you spent, and any particular problems you ran into

## Evaluation
We are looking for: 
1. Communication
2. Solution Design
3. Completeness
4. Code clarity / readability

--------------------------------------------------------------------------------------------------------------------

Order Management System Web Service - README

Solution Description

The solution is a web service for an order management system module. It is implemented using Node.js and Express framework. The service utilizes Sequelize ORM for interacting with a MySQL database. The web service provides endpoints for performing CRUD operations on orders.

At a high-level, the web service works by receiving HTTP requests at specific endpoints, handling those requests using appropriate route handlers, and interacting with the database to perform the requested CRUD operations. The service returns JSON responses with appropriate HTTP status codes to indicate the success or failure of the operations.

Trade-offs Made

Some of the trade-offs made in the solution include:

Simplicity over scalability: The focus was on providing a simple and functional solution rather than optimizing for high scalability. This means that the service may not handle extremely high loads efficiently.

Limited error handling: The solution provides basic error handling for cases such as duplicate orders within a certain time frame. However, more sophisticated error handling and validation could be implemented depending on the specific requirements of a production environment.


Assumptions Made

The following assumptions were made while implementing the solution:
The order management system deals with a single entity (orders) and does not require complex relationships with other entities.
The service does not require authentication or authorization for accessing the endpoints. In a production environment, appropriate authentication and authorization mechanisms should be implemented based on the specific requirements and security considerations.


Changes for Production

3 hour check will fail in case this app is deployed to multiple servers (horizontal scaling). So, you will need to store lastUpdatedTime in some common location like cache server or database.
Implementing authentication and authorization mechanisms to secure the endpoints and restrict access to authorized users only.
Enhancing error handling and validation to provide more detailed and informative error messages, making it easier to troubleshoot issues.
Implementing input validation and sanitization to prevent potential security vulnerabilities, such as SQL injection or cross-site scripting attacks.
Implementing logging and monitoring to track system behavior, performance, and errors for better debugging and maintenance.
Scaling the application horizontally to handle increased traffic by utilizing load balancers and distributing the workload across multiple instances.


Environment Setup Instructions

To set up the environment and run the project, follow these steps:

Clone the repository: git clone 
Install dependencies: npm install
Configure the database connection in the config/config.js file. Modify the development object to specify your MySQL database credentials.
Run the database migrations to create the necessary tables: npx sequelize-cli db:migrate
Start the server: npm start
The web service will be accessible at http://localhost:3000.

Parts of the Spec Completed and Time Spent
The following parts of the spec were completed:

Implementation of CRUD operations for orders.
Handling edge case of preventing creation or update of orders within 3 hours of a pre-existing order.
JSON response format for all endpoints.
Basic error handling and appropriate HTTP status codes.
The time spent on the implementation of the web service was approximately 8 hours.

Particular problems faced during the implementation process were:

Ensuring proper validation and error handling for preventing duplicate orders within a certain time frame.
Writing robust and effective tests to cover various scenarios and edge cases.