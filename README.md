# WIN Backend Engineering Interview

## Scenario

Your mission is to build a portion of an order management system. You need to provide a service that allows other systems and teams to obtain information about orders.

## Deliverables

There are two deliverables for this project:

1. An internal web service API for managing orders
2. A test suite to validate the web service and library work as expected


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


## Description
The solution is a web service for an order management system module. It is implemented using Node.js and Express.js framework. Used MongoDb to store the data. The web service provides endpoints for performing CRUD operations on orders.

## Approach

## Trade-offs Made

Some of the trade-offs made in the solution include:

Using MongoDb as it is was lightweight, scalable horizontally and uses Jspn format

## Assumptions Made

The following assumptions were made while implementing the solution:
The order management system deals with entity (orders) and (services) and does not require complex relationships with other entities.
The service does not require authentication or authorization for accessing the endpoints. In a production environment, appropriate authentication and authorization mechanisms should be implemented based on the specific requirements and security considerations.
Order Id is taken from the user. Efficient way is to generate through system.
Services need to be added to database before orders are created since created order without specific service is not valid.


## Changes for Production

Changes to the .env file according to the Production values.
Implementing authentication and authorization mechanisms to secure the endpoints and restrict access to authorized users only.
Enhancing error handling and validation to provide more detailed and informative error messages, making it easier to troubleshoot issues.
Input validations.
Scaling methods.


## Environment Setup Instructions

To set up the environment and run the project, follow these steps:

Clone the repository: git clone 
Install dependencies: npm install
Configure the database connection and connect to it.
Start the server: npm start
The web service will be accessible at http://localhost:3000.

## Parts of the Spec Completed and Time Spent
The following parts of the spec were completed:

Implementation of CRUD operations for orders and services.
## Assuming updating of an order is restricted
Handling edge case of preventing update of orders within 3 hours of a pre-existing order. 
JSON response format for all endpoints.
Basic error handling and appropriate HTTP status codes.
The time spent on the implementation of the web service was approximately 6 hours since I have not worked on nodeJs in recent times.

Particular problems faced during the implementation process were:

Implementing nested object structure
Writing tests to cover various scenarios and edge cases.

## Your service should return an error on creation/updating an order within 3 hrs of a pre-existing order
The problem here has 2 aspects.
i. To consider all orders and restrict creation/update if any other order is updates in 3 hrs.
ii. Considering respective order and preventing it from updating in 3 hrs.