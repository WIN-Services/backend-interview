# Order Management System

## Description

The Order Management System is a web service built using Node.js, Express.js, Prisma, TypeScript, and MySQL. It provides endpoints for managing orders, including creation, retrieval, updating, and deletion.

The system follows a RESTful architecture, with each endpoint corresponding to a specific CRUD operation on orders. Prisma is used as the ORM (Object-Relational Mapping) tool to interact with the MySQL database, facilitating database operations and data modeling.

## Trade-offs

1. **Simplicity vs. Complexity**: One trade-off made in this solution is prioritizing simplicity over complexity. The system is designed to be straightforward and easy to understand, which may sacrifice some advanced features or optimizations.

2. **Performance vs. Scalability**: Another trade-off is balancing performance and scalability. While the system is optimized for performance in its current state, further optimizations may be necessary for handling larger volumes of data or higher traffic loads.

## Assumptions

1. **Single Database Instance**: The solution assumes a single MySQL database instance for storing order and service record data. If deploying to a production environment with multiple database instances or sharded databases, additional configurations may be necessary.

2. **Authentication and Authorization**: Authentication and authorization mechanisms are not implemented in this solution. Assume that all endpoints are publicly accessible. In a production environment, proper authentication and authorization should be implemented to secure the system.

3. **Created Endpoints for orders only**: The solution includes APIs specifically for managing order records. However, APIs for managing service records have not been implemented. Instead, the provided service records have been added to the database using seeding scripts during the setup process. This assumption simplifies the scope of the project and focuses on the primary functionality of managing orders.

## Changes for Production

If building this system for production, the following changes and improvements could be considered:

1. **Security Enhancements**: Implement robust authentication and authorization mechanisms to secure the endpoints and protect sensitive data.

2. **Error Handling and Logging**: Enhance error handling and logging to provide meaningful error messages and capture logs for monitoring and debugging purposes.

3. **Performance Optimization**: Conduct performance testing and optimization to ensure the system can handle a large number of requests and data volumes efficiently.

## Environment Setup

To set up the environment and run the project locally, follow these steps:

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/WIN-Services/backend-interview.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up the MySQL database and update the database connection configuration in the `.env` file with the appropriate credentials and connection details. [.env.local,.env.development,.env.production], please refer .env.example:

4. Run the migration to create the necessary database schema, and then seed the data:

   ```
   stage = local | dev | prod

   npm run db:migrate:[stage]

   ex: npm run db:migrate:local


   // To seed data

   npm run db:seed:[stage]

   ex: npm run db:seed:local
   ```

5. Start the dev server:

   ```
   npm run start:[stage]

   ex: npm run start:local
   ```

6. Test app using the command:

   ```
   npm run test:local
   ```

7. Build app using the command:

   ```
   npm run build
   ```

8. Finaly, to start the build server run:

   ```
   npm run start:server:[stage]

   ex: npm run start:server:local
   ```

## Spec Completion and Time Spent

- **Spec Completion**: All specified endpoints for managing orders and service records have been implemented.
- **Time Spent**: Approximately 2 hours were spent on designing, developing, and testing the solution.
- **Problems Encountered**: No significant problems were encountered during the development process.
