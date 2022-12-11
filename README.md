-language used: js

-framework used: express, mongoose
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB

- DB used: MongoDB
here is used MongoDB-memory-server.It is a package that spins up a real MongoDB server. stores data in memory.
-------------------------------------------------------------------------
What you would change if you built this for production?
-------------------------------------------------------------------------
-jwt authentication with refresh token rotation and reuse detection, Node.js JWT Authentication is leveled up when you add refresh token rotation and reuse detection
-error handling in production and mongoose validation error handling
-better errors and refactoring
-better data modeling for services and orders.
-implement with real MongoDB cluster
-etc...
-------------------------------------------------------------------------

I added a new field createdAt in order. I assume datetime  is not a field but it will show in every get request JSON and its value is the current time.i used aggregation pipline/function in mongodb to show all GET request for orders. 
