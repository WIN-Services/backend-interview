# WIN Backend Engineering Interview

## High Level Solution
To build the order management system, I have picked [Node.js](https://nodejs.org/en/docs/) framework with the following stack
1. [Express](https://expressjs.com/en/starter/installing.html): For server
2. [MoongoDB](https://www.mongodb.com/docs/drivers/node/current/): For database 
3. [Zest](https://jestjs.io/): For writing testcases

- I started with creating schema models to handle orders and services
- I have created a folder called `routes` where I have defined all the routes
- To keep the code structure clean I have written logic pertaining to each route `controller` directory
- I have created a directory called `utils` in order to write the re-usable helper functions
- I have used zest in order to write suites for service and order routes in `tests` directory
- I have added comments on every logic to make the code easy to understand 

## Instructions to Setup the project
- clone the repository by using `git clone`
- run `npm install` on terminal to install node modules
- create `.env` file and add variables mentioned in **env-example** file.
- Install and setup [MongoDB compass](https://www.mongodb.com/docs/compass/current/install/) in order to connect the application with mongo db cluster
- run `npm start` on terminal to start the server
- run `npm test` on terminal to start the test suits (Note! change the static orders and service IDs to new Ids to make sure that the test suites runproperly)

## Folder Structure
- models: For writing schemas 
- routes: For defining routes
- controller: For writing the logic for each route
- database: For connecting database
- utils : For writing re-usable helper functions
- tests: For writing the test suites for endpoints

## API Documentation

**Order Routes -** 
1. `(POST) /api/order` - 
To create an order
2. `(GET) /api/order` - To get all the orders
3. `(GET) /api/order/:id` - To get the order by id
4. `(PUT) /api/order/:id` - To update an order by id
5. `(DELETE) /api/order/:id` - To delete an order by id

**Service Routes -** 
1.  `(POST) /api/service` - 
To create service
2.  `(GET) /api/service` - To get all the services
3.  `(GET) /api/service/:id` - To get the service by id
4.  `(PUT) /api/service/:id` - To update the service by id
5.  `(DELETE) /api/service/:id` - To delete the service by id

## Changes for production
- There should a authentication system for the APIs like [JWT](https://jwt.io/) in order to secure the application 
- [Swagger docs](https://swagger.io/) should be used in order to maintain the API documentations
- Use of memoize function for faster processing of queries
- Create a proper [CICD](https://www.redhat.com/en/topics/devops/what-is-ci-cd#:~:text=CI%2FCD%20is%20a%20method,continuous%20delivery%2C%20and%20continuous%20deployment.) for deployment of the code on development and production servers
- Should integrate [sentry](https://sentry.io/welcome/) for handling and resolving errors quick
- Should use [git branching model](https://nvie.com/posts/a-successful-git-branching-model/)

## Total time spent 
Around 3 hours