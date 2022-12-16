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
## Order management
Order management system service which is meant to provide a public to have the required data around the orders.
Applications as we see: Courier services

## What you would change if you built this for production
- One thing is that there should be login type of mechanism to call the apis and access level management to access the data
- There should be sharding of the database to decrease the latency while fetching
also we can use messaging services, in memory services to prepare the data in hand before querying so the latency is less.

## Setup Requirement
We require below services/software on system for project setup.
* Node v16.x
* NPM 6.x and above
* GIT

## Setup Guide
* Install packages and dependencies
- npm install

Create `.env` file  in server directory with following set of commands and configure according to environment. You can set the value of `PORT` and `mongourl` according to production or development as well

$ touch .env
SET the values according to your local setup
PORT=<80 or any port>
MONGO_URI=<your mongo url>

run the server.js file:
$ node server.js
/**
Use postman to test the apis with the http rest methods and
check the route.js file to test the endpoints
**/