# WIN Backend Engineering Interview

## General Info

language used: Javascript 
framework used: Express, Jest
database: MongoDb with mongoose

## How it works

REST Endpoints 
server: localhost:3000/

Service
Get all: api/service/
Get: api/service/:id
Post: api/service/
Put: api/service/:id
Delete: api/service/:id

Orders
Get all: api/order/
Get: api/order/:id
Post: api/order/
Put: api/order/:id
Delete: api/order/:id

## Scripts
start: npm start
test: npm test

## Structure

service: {
	id: int,
	name: string
}

order: {
	id: int,
        datetime: timestamp,
        totalfee: int,
        services: [
        	{
                    id: int (linked to service)
                }
        ]
}

## Changes for production
- Add security
- Better logging implementation
- More test cases
- Db indexing
- use .env file for server and DB constants

## Setup
- clone the repo
- change DATABASE_URI in constants > database
- start mongodb server.
- run "npm i" to install packages
- run "npm start" to start server
- run "npm test" to run test cases

## Problems
- Created a separate id field for both the collections rather than using the _id that the db creates automatically. Using the _id would have made the checks quite easy. Deletion and insertion checks require getting the data from db using id and this could have been a bit faster if _id was used in the schema directly.

4.  In the PR, include a README that includes the following:
      - A description of your solution at a high-level, including language used, framework used, roughly how it works, etc.
      - What trade-offs you made
      - Any assumptions you made that affected your solution
      - What you would change if you built this for production
      - Brief instructions on how to setup the environment to run your project
      - What parts of the spec were completed, how much time you spent, and any particular problems you ran into


