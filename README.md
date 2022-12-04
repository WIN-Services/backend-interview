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

#Description of Changes

I've built a system to place orders, update them(post 3 hours of order placement), cancel these orders, to getOrdersbyOrderId and getAllOrders Placed, request a service for these orders by order id and fetch all services availed by a particular orderId.

TECH STACK-
I've Used NodeJs(JavaScript framework) here along with MongoDB database.

ENDPOINTS-

=> CREATE ORDER - POST          http://localhost:3000/createOrder BODY- 
      {
        "orderName": "isha chandani",
        "orderQuantity":4,
        "orderType":"tv",
        "address":"Bengaluru",
        "pincode":560035
        }
=> UPDATE ORDER - POST          http://localhost:3000/updateOrder?id=bce202ba19a2edb0
=> GET ORDER BY ID - GET        http://localhost:3000/getOrderById/c910e3c908881b19
=> GET ALL ORDERS - GET         http://localhost:3000/getAllOrders
=> CANCEL ORDER - DELETE        http://localhost:3000/cancelOrder/bce202ba19a2edb0
=> REQUEST SERVICE BY ORDER- POST            http://localhost:3000/requestService/c910e3c908881b19
=> GET ALL SERVICES BY ORDER ID - GET            http://localhost:3000/getAllServicesByOrderId/c910e3c908881b19


HOW IT WORKS?

Start with Placing an Order with CREATE ORDER endpoint, then try updating this order with UPDATE ORDER endpoint using the orderId generated in the response and GET ORDER BY ID to get details of every order placed, To fetch details of all orders hit the GET ALL ORDERS endpoint, you can cancel an order by hitting CANCEL ORDER endpoint, To place a service request on your order hit, and get all services requested for an order by hitting GET ALL SERVICES BY ORDER ID.


IF THIS WAS TO GO FOR PRODUCTION?

I'd add a cache to reduce the Database calls and would increase the number of services like cancelling requests, updating request details, would have more clarity of what each service is dedicated to and decouple the system more, would try to build a more optimisable code to handle more number of requests and increase code reusability.


WHAT PARTS OF SPECS WERE COMPLETED AND HOW MUCH TIME I SPENT?

I think I've completed majority endpoints that I could think of and have mentioned a few that could have been improvements in the future. I spent nearly 4-5 hours on this assignment.


#ENV File-

PORT=
DB_USER=
DB_PASS=
DB_URL=


SETUP INSTRUCTIONS-

Run command - docker-compose up



