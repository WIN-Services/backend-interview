# Order Management System API

## Solution Description

I have developed an order management system API using Node.js with Express framework and PostgreSQL as the database. The API allows other systems to obtain information about orders. It provides several endpoints to perform CRUD operations on orders.

The API has the following endpoints:

1. **GET /orders**: Retrieves all orders from the database, including the associated order services.
2. **POST /orders**: Creates a new order. It validates the datetime and checks for existing orders within 3 hours. If there is a pre-existing order within the allowed window, it returns an error.
3. **GET /orders/:id**: Retrieves a specific order by its ID.
4. **PATCH /orders/:id**: Updates an existing order by its ID. It checks if the order is within the allowed update window (3 hours) and returns an error if it's not.
6. **DELETE /orders/:id**: Removes an order by its ID.

The API returns JSON results and handles edge cases appropriately by returning appropriate HTTP status codes.

## Trade-offs

While developing the API, I made the following trade-offs:

1. **Simplicity**: I focused on a proper architecture using ExpressJs, TypeScript, Sequelize and Inversify.Js. This architecture purpose is to minimise boilerplate code. This project architecture it to provide better code quility using best practices. 
Added API layers including Applicatiin -> Route(Entity) -> Controller -> Service -> Respostory -> Model -> Database
Route is reponsible for handler route and that denotes Entity
Controller is responsible for pasring requested data and exceute service function using requestion data
Service is responsible for Bussines layer that take of each and every logic for operations
Repository is responsible for data model wrapper. Each data table have respective repository
Data model and ORM is responsible for communication with database and pasring queries
This followes proper SOLID principle
This generic implementation can help developing NodeJS mico-service
2. **Error Handling**: I added basic error handling by returning appropriate HTTP status codes and error messages. However, in a production environment, more robust error handling and logging would be necessary.
3. **Data Validation**: I assumed that the request body for creating and updating orders will be properly formatted and validated by the client system. In a production environment, I have added validator middleware to check input data before it go to create.
4. **Authentication and Authorization**: The API does not include authentication and authorization mechanisms. In a production environment, it would be essential to implement authentication and authorization to secure the endpoints and control access to the system.

## Assumptions

During the development of the API, I made the following assumptions:

1. The service records and orders are stored in separate collections/tables in the database.
2. Services needs to be seeded by before running the application. Assuming service are fixed. I focused on order API's
3. I have created OrderService model to keep relation between order and service (1 -> n).
4. Create database and set dbconnectionString it in .env file before start the app

## Changes for Production

If I were to build this API for a production environment, I would consider the following changes:

1. **Authentication and Authorization**: Implement a robust authentication mechanism, such as JSON Web Tokens (JWT), to secure the endpoints and ensure that only authorized systems or teams can access the API.
2. **Input Validation**: Implement input validation and data sanitization to prevent malicious data and ensure data integrity. This can be achieved using libraries like Joi or Express Validator.
3. **Logging and Error Handling**: Set up proper logging mechanisms to capture errors, exceptions, and API activities. This will help in troubleshooting and monitoring the API's performance.
4. **Pagination and Filtering**: Add pagination and filtering options for the `/orders` endpoint to handle large datasets efficiently and allow clients to retrieve specific subsets of orders.
5. **Caching**: Implement caching mechanisms to improve the API's performance and reduce database load. Caching can be done using tools like Redis or in-memory caches like Memcached.
6. **Rate Limiting**: Apply rate limiting to prevent abuse or excessive requests to the API. This helps in maintaining the system's stability and security.
7. **API Documentation**: Generate comprehensive API documentation using tools like Swagger or OpenAPI to provide clear instructions and guidelines for API consumers.

## Setup Instructions

To set up and run the project, follow these steps:

1. Clone the repository to your local machine.
2. Install Node.js and npm (Node Package Manager) if not already installed - User Node version v18.16.0
3. Install the project dependencies by running `npm install` in the project directory.
5. Update the database connection URL (`postgres://<userName>:<password>@<host>:<port>/<dbName>`) in the code .env
6. Add file `.env` using conent `databaseConnectionString=postgres://<userName>:<password>@<host>:<port>/<dbName>`
6. Add file `.migration_config.json` with content `{"development": {"url": "postgres://<userName>:<password>@<host>:<port>/<dbName>","dialect": "postgres","seederStorage": "sequelize"}}`
7. Run migration using the command `npm run migration`
8. Run seed using the command `npm run seed`
9. Run the API using the command `npm run start`.
10. The API will be accessible at `http://localhost:3000`. Port can be customized via .env.

## Completion Status and Time Spent

I have completed the following parts of the specification:

- Implemented the web service API for managing orders.
- Created endpoints for retrieving service records, retrieving all orders, creating a new order, retrieving a specific order, updating an existing order, and removing an order.
- Added basic error handling and appropriate HTTP status codes for different scenarios.
- Connected to PostgreSQL.
- Developed the API using TypeScript with the Express framework and Sequelized.
- Create unit tests for some API endpoints.

I spent approximately two and a half hour on the project, including setting up the project structure, implementing the endpoints, writing tests, and preparing the README.

## Challenges Faced
I did not face any significant challenges while developing the order management system. The main challenge was to ensure the correct handling of time validation and returning appropriate error responses.

Overall, the project was a good exercise in designing and implementing a web service API for order management.