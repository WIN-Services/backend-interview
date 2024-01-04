# Order Management System

## Description
This solution is an order management system developed using **Node.js** with the **Express** framework, utilizing **PostgreSQL** for database management and **Sequelize** as the ORM. It facilitates the creation, retrieval, updating, and deletion of orders, each potentially including multiple services.

## Trade-offs
- Used Sequelize for ORM, trading off some performance for quicker development.

## Assumptions
- Services are pre-defined and infrequently changed.
- Primary interactions are centered around order operations.

## Changes for Production
- Implement robust error handling and data validation.
- Use environment variables for sensitive data.
- Integrate authentication and authorization mechanisms.
- Establish comprehensive logging and monitoring.

## Setup Instructions
1. **Clone the Repository**: `git clone [repository-link]`.
2. **Install Dependencies**: Run `npm install`.
3. **Database Setup**: Initialize a PostgreSQL database.
4. **Environment Variables**: Configure `config/config.json` with database credentials.
6. **Start the Server**: Use `npm start`.

## Running the Test Suite
- Run unit tests using `npm test`.
- Ensure a test database is configured for accurate test results.

## Specification Completion and Time Spent
- **CRUD Operations**: Fully implemented.
- **Test Suite**: Completed for API endpoints.
- **Time Spent**: Approximately X hours.
- **Challenges**: Implementing Sequelize model relations and handling date-time formats.
