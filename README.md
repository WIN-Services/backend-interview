## Solution Overview
Language Used: JavaScript (Node.js)
Framework Used: Express.js , Jest
Database: PostgreSQL with Sequelize ORM
Functionality: The system provides RESTful APIs for managing orders, one can perform addition,deletion,updation,and retrieval of orders and also restriction of duplication by pre-existing order placed within 3 hours.

## Trade-offs Made
1. Simplicity vs. Complexity: Prioritized simplicity in API design and code structure to enhance maintainability.
2. Performance vs. Scalability: Optimized database queries for performance while ensuring scalability through efficient indexing and optimization.
3. Readability vs. Conciseness: Emphasized readability by using descriptive variable names and comments, sacrificing some code conciseness.

## Assumptions Made
Orders can be created and updated with valid data, assuming proper validation rules are enforced.
Error handling is implemented at the API level, providing meaningful error messages for client-side consumption.


## Changes for Production
- Implement rate limiting and request throttling to ensure system stability.
- Enhance security measures by implementing HTTPS, input validation, and SQL injection prevention, user Authentication.
- Set up logging and monitoring to track system performance, errors, and user activities.
Implement caching strategies to improve response times for frequently accessed data.

## Environment Setup
To set up the environment and run the project, follow these steps:

Install Dependencies: npm install

To setup Database locally
Set Up Database: Create a PostgreSQL database and update the database configuration in .env file.
Run Migrations: npm run migrate to run database migrations.
Start Server: npm start to start the server.

Run through docker
 docker build -t order-management .
 docker run -p 5000:5000 order-management
 docker compose-up


## Spec Completion and Time Spent
Spec Completion: Implemented CRUD operations for orders, and basic error handling. Approximately 2-2.5 hours were spent on development.

Challenges Faced: Implementing sequealize took some time.