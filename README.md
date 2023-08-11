# WIN Backen Engineering Interview
# Description:

## Stack used: 
## Time taken to complete Task: 6hours
    - Typescript
    - Postgresql 
    - Express
    - Node.js
    - prisma
  + Unit-testing
  - mocha 
  - chai

## Solution-details:-
  - Firstly i choose to use typescript instead of javascript, because it helps with data type error before hand.
  - After that i choose to structure the files in MVC format.
  - Now i started Schema designing with the help of prisma and gave basic design for the project
  - i started working on the project using express and storing all my envs in the .env file 
  - created the specified route for the task one by one, i started with business logic first
  - after the business logic was complete, i started working on the unit testing part of the project(have inclueded atlest one test for each function)
  - Now i started working on the middlewares for the routes, here i implemented the check for the 3 hours which was mentioned in the task
  - now completed all the tasks, i double check the whole route for any edge cases and completed the task.

## Trade-offs made:-
  - i used a secondary database for testing 

## Assumptions made:-
  - assumed that the services will already have the correct data present 
  - assumed that when data is send to the route correct details of services i provided.

## Instructions on how to run :
  + Prerequisites:
    - nodejs
    - typescript install globally
    - prisma installed globally

  $$ Application:-
  1. run npm install 
  2. add ENVS which are:-
    i. PORT: which is the port number
    ii. DATABASE_URL: postgresql route avalible to you
  3. Run the command npx prisma db push
  4. Run the command npm seed (populate the database)
  5. Run npm start:dev 
  6. Now the application has started and running on the specified port

  $$ Test:-
  1. Change the DatabaseUrl in the envs to another test_db databaseUrl
  2. npm run test , this will start the test.

