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


## Solution:
1) Language used: Typescript
2) Database used: SQlite (Reason: Very simlar to postgres, works with TypeOrm and is Lightweight)
3) Framework used: Express

## Steps followed:
1) First step was I did npm init and added the required packages like express, Typeorm and sqlite3.
2) Then In designed the database as in the what are the fields needed and how will many-to-many relation between orders and services be handled.
3) Once the inner repository layer was complete, I wrote the services layer to interact with the db, that is perform crud operations.
4) Then, I started with the main file that index.ts and started to write the routes and created REST API's which will use the functions in the service layer.
5) Finally the controllers interact with the service layer and get the desired output
6) Then wrote some tests for the orders, did not write tests for all the api's due to time constraint


## Future Requirements:
1) It requires a user managment system: Admin and other users.
2) Payment Processing service needed for receiving payments for the desired services
3) User Authentication system which validates the admins

## REASON for using a SQL Database over NOSQL:
a) For applications which have orders, services and payments involved, I felt its better to use a database with strong consistency in transactions. In future when payment system will get involved, we will need a SQL db to store those transactions eventually. Hence kept everything is SQL to take advantage of ACID properties.
b) For scale in future, we can definitely distribute this database and create shards.
c) Intensive transactions consisting of queries can be divided into multiple optimized subqueries, which can be processed in a parallel fashion.
d) Reduced redundancy in the future where we can have multiple orders, services and users
e) Easier to manage if we have a strong consistency guarantee.

## TradeOffs:
a) Scaling a SQL database can be complex. But it is achievable with the help of sharding and using consistent hashing to access the right shard for the db.

## Code Design:
1) Developed the backend using an approach that combined modularity and OOPS. This makes it possible for the code to be flexible, scalable, effective, and understandable.
2)Code is designed to make it highly decoupled as in the future if any new requirements are needed to be added, it can be done the layer they are needed. For example, we decide that we want to change db to let's say MongoDb, we just need to change the service layer.

## Changes required before deploying it to production:
a) We can use Postgres for that and add credentials in the envronment file. Then in createconnection function, just use that.
b) Authentication mechanism can be added. Initially for all the requests checksum based authentication should work.
c) Making all the requests to "POST" also secures the requests as ID does not get exposed to the general public. In the body you can add the id of the order you want to get.
d) tests for all the functions need to be added

## Instructions to set up the environment:

1) Clone repo
2) Initialize a new Node.js project using npm init command:
    npm init
3) Install the necessary dependencies in package.json:
    npm install
To run project:
    npm start

I am adding a postman collection, just import it in your postman and you will be able to hit the endpoints.

## Parts Completed:
All the required endpoints were completed and are running.
