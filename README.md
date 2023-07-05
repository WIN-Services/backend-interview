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


## chnages for production
  1. Authentication 
  2. Rate limiting
  3. Sharding of databases 
  4. Validations on schema
  5. caching like redis or memcache
  6. APis for services object handling 
  7. Admin panel



## Instructions to run project locally 
  1. install node 
  2. clone the repo
  3. run npm i
  4. install mongodb locally
  5. run command -> npm run start/ node app.js
  6. install postman or thunderclient ( vs code extension ) to play with apis

## Completion
  All parts are completed 

  Time Taken 
  1. Setting up repo structure for modular design - 1hrs
  2. Writing apis  - 30 mins
  3. Testing - 30 mins

  Problems encountered 
    1. Laptop had hardware issues, so setup all on new (arranged) lappy and used mongodb as had less time to complete the assignment

###### Future Scope/Changes need to be done before deployment to production
## In Orders
take userId from session or jwt ( here need to send userId in JSON as otherwise it will be deleted, could have handled it by only updating services in the doc but had the broader view that userId will not be passed from front end, will handle through tokens only )
//Checks will be on frontend like can't place any order without any services ( 0 items ) or without logged In can be checked at backend too
// Will create DTO for all (in nestJS) and for services array also validate each input - like - quantity, serviceName, serviceId etc.


## in services
// Will only pass objectId of the service bought and quantity to the backend, else everything will be done from backend, userId from session or token, services details through db
// will add service id only but as of now only working on orders stored whole service object ( if service can be quantitative - will store quantity as well.)

in user
// Will check if this all implemented or not
// bcrypt for password storing via hashing
// jwt or session for restricting user to order while loggedin only
// encrypt mobile number and email too


#### Curls of all the requests

## Get all orders

curl  -X POST \
  'http://localhost:3000/order/' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "services":[{"id":1,"serviceName":"Inspection","amount":200,"quantity":1},{"id":2,"serviceName":"Analysis","amount":300,"quantity":2},{"id":3,"serviceName":"Testing","amount":500,"quantity":1}],
  "userId":126
}'

## Create a order

curl  -X POST \
  'http://localhost:3000/order/' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "services":[{"id":1,"serviceName":"Inspection","amount":200,"quantity":1},{"id":2,"serviceName":"Analysis","amount":300,"quantity":2},{"id":3,"serviceName":"Testing","amount":500,"quantity":1}],
  "userId":126
}'

## Get a specific order

curl  -X GET \
  'http://localhost:3000/order/64a5244465fa05a800139c92' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)'

## Update a specific order

curl  -X PUT \
  'http://localhost:3000/order/64a5246265fa05a800139c95' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "services":[{"id":1,"serviceName":"Inspection","amount":200,"quantity":2},{"id":2,"serviceName":"Analysis","amount":300,"quantity":2},{"id":3,"serviceName":"Testing","amount":500,"quantity":2}],
  "userId":126
}'

## Delete a specific order

curl  -X DELETE \
  'http://localhost:3000/order/64a5244465fa05a800139c92' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)'

## Get all order of a specific user

curl  -X GET \
  'http://localhost:3000/order?userId=126' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)'