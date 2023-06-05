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




# Order Management System

This is an Order Management System implemented using Node.js, Express.js, PostgreSQL, Sequelize, and Mocha for testing.

## Description

The Order Management System provides API endpoints for creating, retrieving, updating, and deleting orders. It uses a PostgreSQL database to store order data and Sequelize as an ORM for interacting with the database. The system is built using Node.js and Express.js to handle HTTP requests and responses. Mocha is used for writing test cases to ensure the functionality of the system.

## Trade-offs

- **Simplicity vs. Scalability**: The system is designed to be simple and straightforward, focusing on the core functionality of order management. For larger-scale applications, additional features such as authentication, authorization, and more robust error handling could be implemented.

- **Performance vs. Readability**: The code prioritizes readability and maintainability over performance optimizations. Depending on the specific requirements of the production environment, performance enhancements such as caching, indexing, or query optimizations may be necessary.

## Assumptions

- The system assumes that there is a PostgreSQL database already set up and configured.

- It assumes that the necessary dependencies have been installed, including Node.js, Express.js, Sequelize, and Mocha.

- The system assumes a basic understanding of RESTful API design principles and HTTP concepts.

## Future Improvements

If this system were to be built for production, the following improvements could be considered:

- **Validation and Error Handling**: Enhancing input validation and error handling to provide more informative and user-friendly error messages.

- **Security**: Implementing authentication and authorization mechanisms to secure the API endpoints.

- **Performance Optimization**: Analyzing and optimizing database queries, caching frequently accessed data, and employing indexing strategies for improved performance.

- **Logging and Monitoring**: Adding logging and monitoring capabilities to track system behavior, detect errors, and gain insights for troubleshooting and performance analysis.

## Setup Instructions

To set up and run the project, follow these steps:

1. Clone the repository: `git clone https://github.com/WIN-Services/backend-interview.git`

2. Install dependencies: `cd backend-interview` and `npm install`

3. Configure the PostgreSQL database connection settings in the `config/config.json` file.

4. Add change local.env to .env and add DATABASE_URL link  

5. For first time run script.js :`node script.js` 

6. Start the server: `npm start` 

6.Run test cases :`npx mocha`

## Project Completion

The following parts of the specification were completed:

- API endpoints for creating, retrieving, updating, and deleting orders.

- Integration with a PostgreSQL database using Sequelize ORM.

- Error handling for validation and data not found scenarios.

- Test cases written using Mocha.

The project took approximately 4 hours to complete. During development, I encountered some challenges with handling error messages and ensuring data integrity in concurrent order creation scenarios. However, those challenges were resolved by implementing database constraints and adding appropriate validation checks.
