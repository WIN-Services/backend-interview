# WIN Backend Engineering Interview

## Overview of my Solution - by Ujjal Khadka

I have created a web service for managing orders based on services. The web service is intelligent enough to restrict any addition or modification of an existing order within 3 hours of time duration. It is a great solution for Logistic systems where conficting orders can be avoided. I have designed and built the web service by keeping this in mind.

The project is created using Expressjs as the backend library (in nodejs). I used TypeScript for faster and efficient development. I chose mongodb and mongoose as ODM (Object Data Modelling) library as mongodb is a NoSQL database and is very efficient for storing JSON data. I have used Jest as the testing framework. I have used object-oriented programming approach at almost all places where I could.

There were not any major trade-offs that I had to make. One thing that could have be been changed such that it would have a major positive impact towards speed was to introduce pagination in get orders route. Even the offset-based pagination would have been a great improvement. I left it as it is because I thought it was not a major issue for this project.

## Assumptions

I assumed the order management system was related to logistics, and the reason for not allowing any modification to an existing order within 3 hours of time duration was to avoid conflicting orders. So, I developed the solution keeping this in mind.

## How to setup the environment to run the project

### Prerequisites

#### 1. MongoDB

#### 2. Nodejs

### Steps

#### 1. Clone the repository

#### 2. Install dependencies

`npm install`

#### 3. Create the database

In the database, create a new database named "win-backend-interview"

#### 4. Seed the database

`npm run data:seed` (This will seed the database with the sample data provided in the problem statement)

#### 5. Run the server

`npm run start` (This will start the server at port 5000)

#### 6. Run the tests

`npm run test` (This will run the tests)

## What parts of the spec were completed, how much time you spent, and any particular problems you ran into

I completed all the parts of the spec. I spent around 5 hours to complete the project. I did not run into any major problems. The only time consuming part in the solution was to understand what this sentence meant "Your service should return an error on creation/updating an order within 3 hrs of a pre-existing order." I had to think about it for a while and then I realized that it was related to logistics and conflicting orders. Once I understood that, I was able to complete the project without any problems.

Apart from development, the testing part is still left. I do not have proper skills in this serction. I'm learning it and I will be able to do it in the future.

## API Documentation

I have saved the Postman collection in the root directory of the project. The name of the file is `WIN.postman_collection.json`. You can import this file in Postman and test the API.
I have also added examples of the API calls in the Postman collection for your convenience.

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
        "id": "123"
      }
    ]
  },
  {
    "id": "224",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
      {
        "id": "789"
      }
    ]
  },
  {
    "id": "225",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
      {
        "id": "456"
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
