# WIN Backend Engineering Interview

## Order Management System

### Description


This project implements an Order Management System API using Node.js with Express framework. The system allows creating, retrieving, updating, and deleting orders, as well as managing associated services. The system also checks the rule that orders cannot be created or updated within 3 hours of an existing order.

## Technology Stack

- Language: JavaScript (Node.js)
- Framework: Express
- Database: MySQL
- Testing: Jest


### How It Works

- The Express web service exposes various API endpoints for managing orders.
- The MySQL database stores order and service data, with proper relationships between tables.
- Endpoints handle HTTP requests (GET, POST, PUT, DELETE) and interact with the database using SQL queries.
- The provided data models ensure data integrity and proper handling of time-based constraints.

### Trade-Offs

- Simplicity over complexity: The solution prioritizes simplicity and straightforward implementation over advanced features.
- Limited error handling: Error handling focuses on essential cases. More advanced error handling can be added for production.


## Assumptions

- MySQL database is used, and the schema adheres to the provided specifications.
- Time-based constraints are handled directly in the API endpoints.
- Basic input validation is sufficient for the scope of the project.

### Changes for Production
- Implement more comprehensive error handling and validation.
- Introduce authentication and authorization system.
- Use a logging system for better monitoring.
- Implement more test cases for edge cases.

### Setup Environment

- Clone the repository.
- Install dependencies: `npm install`
- Set up MySQL database and configure connection in `db.js`.
- Run the server: `npm start`

## Spec Completion and Challenges

- All API endpoints (GET, POST, PUT, DELETE) for managing orders were implemented as specified.
- Time-based constraint was implemented successfully.
- Test suite using Jest was created and covers scenarios for creating orders and updating orders.
- Time spent: Approximately 3 hours.
- Challenges faced: Ensuring code reusablity, correct MySQL queries, handling time-based constraints were key challenges.

### MySQL DB file

Please use 'win-backend.sql' in 'db' folder for database.

## Setting Up the Database Connection

To connect to the MySQL database, you need to provide your MySQL username and password in the `db.js` file. Follow these steps to set up the database connection:

1. Open the `db.js` file located in the `config` directory.

2. Locate the following lines in the `db.js` file:

 
   const db = mysql.createPool({
     host: 'localhost',
     user: 'USERNAME',
     password: 'PASSWORD',
     database: 'win-backend'
   });

Replace YOUR_USERNAME with your MySQL username and YOUR_PASSWORD with your MySQL password.

Save the changes to the db.js file.
