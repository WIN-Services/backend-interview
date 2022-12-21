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


## Solution
### Tech Stack Used:
1. Language: Node.js
2. framework: Express
3. Database: MongoDB
4. Testing: JEST and Supertest.  
 
## What trade-offs you made ?
1. Duplicate orders are possible.

## What you would change if you built this for production ?
1. I will use PATCH instead of PUT method as PATCH support partial update.
2. I will create middleware for validations of request.
3. I will create middleware for API responses.

## Brief instructions on how to setup the environment to run your project.
1. Clone the repo and run npm init to get the necessary node_modules and run the command npm start then you can send GET, POST, PUT, DELETE requests to the rest end point.

## What parts of the spec were completed ?
1. I used JEST and Supertest for API testing and implemented testing for fetchAll order through id.


## How much time you spent and any particular problems you ran into ?
1. I have spent 3.5 hours on this project. Faced problem while setting up the date. The requirement was that app shouldn't allow order to be placed in 3 hours interval. It took me some time to implement this feature.
