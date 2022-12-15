# Order management


A description of your solution at a high-level, including language used, framework used, roughly how it works?
- Have used Typescript, MongoDB, Jest & Express, Mongoose to develop the application.
- Created routes specific to each entity(orders here) and services for those entities.
- Services will be called from respective routes to fetch required result.
- Created models/interfaces to know typings of the objects.

##### Language used: javascript, typescript
##### Framework: Express
##### Database: MongoDB


### Time Taken:
1.5hr - Setup (mongo, mongoose, typescript, jest)<br>
1hr - Logic (api routes, logic, services)<br>
0.5hr - Test (manual + jest test case)<br>

### What you would change if you built this for production?
- Would have added authentication
- Centralized logging
- Fetch all orders based on limit and offset, error handlings.
- API documentator & Ajv validator e.g: swagger, ajv
- Would use memoize function for processing queries faster
- Would have made code config driven, e.g: generic error response object, db calls in helper/utility files.
- Audit trail to track modification in orders and who is calling the orders api.

### Assumptions:
- I have assumed we just have 2 collections (orders & services) to build logic on. Though Order management can need more tables.
- Assumed no order is to be created/updated for 3 hrs irrespective of services.

## Problems Encountered
- I was using node v12, jest supports v14. Took some time to get to the issue.



### Installation:
- git clone repo
- npm install
- npm run build (to convert typescript files to js and dump them in dist)
- npm run test (to run jest test cases)
- npm run start (to start the server)

### Endpoint
- GET http://localhost:3000/api/v1/orders

- GET http://localhost:3000/api/v1/orders/:orderId

- POST http://localhost:3000/api/v1/orders 
```
{
    "datetime": "2022-12-15T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "639a1f7c0a4bab211234931e"
        }
    ]
}
```

- PUT http://localhost:3000/api/v1/orders
```
{
    "_id": "639a338a1b1ec7493fb0a165",
    "datetime": "2022-12-15T11:11:11.111Z",
    "totalfee": 1010,
    "services": [
        {
            "id": "639a1f7c0a4bab211234931e"
        }
    ]
}
```
- DELETE http://localhost:3000/api/v1/orders/:orderId

