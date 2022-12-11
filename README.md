# WIN Backend Engineering Interview

## High Level Solution
To design an order management system, I have created two models named Service and Order to perform CRUD operations. This project is built using `Nodejs` and `Express` along with `mongoDB` as the database. For testing purposes, `jest` framework is used. 
- A user can create, edit, get and delete an order and a service using the APIs.
- There are validations in place with each request to avoid unnecessary database calls.
- Furthermore, there are scenerios that are handled like an order cannot be created or updated from a service in case of an pre-existing order from past three hours.
- There are default and optional limit and skip query parameters in place while calling the fetch all functions for pagination and to avoid memory crashes.

## Changes for production
- There will be a Role based authentication to all the APIs to improve security
- There will be caching of all the static user data for faster I/O
- There will be database indexes for all the queries

## Instructions to Setup the project
- clone the repository
- change current working directory to the project's directory
- run `npm install` on terminal to install node modules
- create `process.env` file and add mongoDB connection string (sample file below)
- run `npm run start` on terminal to start the server
- run `npm run test` on terminal to start the test suits
- Please change the static Order and Service Ids mentioned in tests according to the new Ids before running the test command to ensure proper run of test cases

```
MONGODB_URI=mongodb://localhost:27017/win
PORT=3000
```

## API Endpoints

Order - 
- GET: /api/order
- GET: /api/order/:id
- POST: /api/order
- PUT: /api/order/:id
- DELETE: /api/order/:id

Order - 
- GET: /api/service
- GET: /api/service/:id
- POST: /api/service
- PUT: /api/service/:id
- DELETE: /api/service/:id

## Total time spent 
Around 2 to 3 hours

## Problems Encountered
While running the test suite using jest, the command to run the test cases was throwing a Syntax Error. After a lot of search online, I've found out that it is happening because of the node version 12.0. To fix this, I've switched the node version to 14.0 and it is working perfectly fine and all the test cases are running properly.

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
