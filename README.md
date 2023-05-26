# Backend Engineering Interview

Implemented CRUD operation for a simplistic Order Management Service.
It insert data (sample data provided in the main branch readme file) into DB, updates it, deletes it and fetches it using APIs.

The language, framework and libraries used to create the project are
1.  Javascript
2.  node.Js
3.  express.js
4.  mongoDB
5.  mongoose
6.  dotenv
7.  jest
8.  body-parser
9.  cors



## High Level Go Through
Create 2 models out of which 1 store the order details and the other one should store the service records. Also the order records should store the reference of service in the order record.

create APIS for CRUD operation for both orders and service, make restriction upon the creation and updation of order records based on the assumptions made below



## ASSUMPTION

1. I have assumed that is a single user application and all the operation are done by the same user.
2. Form the line "Your service should return an error on creation/updating an order within 3 hrs of a pre-existing order".
    *   User Cannot make and order if he/she has made an order in the last 3 hours.
    *   User cannout update the order (specific) if the value datetime present in the order is less than 3 hours of current datetime  

## REQUIREMENTS

* Node v16.15.1
* Express v4.17.3
* Mongoose v6.2.9
* Jest v29.5.0

## SETUP 

1. Clone the git repository to local.
2. Install the required dependencies using npm along with MongoDB or deploy MongoDB on a docker Image.
3. Create a .env file and set values for PORT And CONNECTION_STRING .
4. Run the application using npm start.
5. Make sure the database connection is made
6. Insert some sample data
7. Run the test suites

## Changs to be made for production

For production build, there is a lot of room for improvement like, 
1. proper validations , 
2. error handling, (unhandeled rejections and uncaught exceptions)
3. logging, 
4. handling cors, 
5. input sanitization.
6. Proper comments
7. graceful exits
and more.