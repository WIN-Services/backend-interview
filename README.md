# WIN Backend Engineering Interview

## Scenario

Your mission is to build a portion of an order management system. You need to provide a service that allows other systems and teams to obtain information about orders.

## Working of the project

1. Services: 
  There are 5 endpoints for services. Base url: 'localhost:port/service/
  1. to fetch all the services present: Endpoint-> Get('/') -> fetches all the active services
  2. to fetch details of one particular service: Endpoint-> Get('/:id') -> fetches the details of that service whose id is passed.
  3. to delete one service: Endpoint-> Delete('/:id') -> soft deletes that particular service
  4. to update one service: Endpoint-> Put('/:id') -> updates that particular service if present
  5. creation of new service: Endpoint-> Post('/') -> Creates new service

2. Orders:
  There are 5 endpoints for orders. Base url: 'localhost:port/order/
  1. to fetch all the orders present: Endpoint-> Get('/') -> fetches all the active orders
  2. to fetch details of one particular order: Endpoint-> Get('/:id') -> fetches the details of that order whose id is passed.
  3. to delete one order: Endpoint-> Delete('/:id') -> deletes that particular order
  4. to update one order: Endpoint-> Put('/:id') -> updates that particular order if present
  5. creation of new order: Endpoint-> Post('/') -> Creates new order after checking if any order is not created before 3 hrs.



## Setting up the Application: 

1. Git clone the repo
2. npm i (To install all the dependencies)
3. Install docker if not present
4. update the env variables as mentioned in .env.example
5. sudo docker-compose build
6. sudo docker-compose up -d
7. Run the postman collection pasted here.  
  Collection: https://api.postman.com/collections/15542555-b32335ec-2eb7-40f2-b179-b191dd0231c9?access_key=PMAT-01HG320PBZPPRFKKD8QAFX2Q6B

  Just get the json from this api. And try running the collection.

## What parts of the spec were completed: 
  Some of the tasks which are left, is 
   -> adding middleware, validations.
   -> adding interfaces.
   -> more test cases 

## Time Spent 
Around 1hr 45 mins

## any particular problems you ran into
Yes, worked with docker for the first time. It was a great learning experience. And i am glad i was able to implement this successfully.

