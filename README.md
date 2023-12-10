# WIN Backend-Interview Assignment

## High-Level Description

This project is a backend service for managing orders, developed using [NestJS](https://nestjs.com/), a progressive Node.js framework, and TypeScript. It provides a RESTful API for creating, retrieving, updating, and deleting orders, as well as managing service records associated with these orders.

## Key Features

- CRUD operations for orders and service records.
- Validation to prevent order creation/updating within 3 hours of an existing order.
- Integration with a PostgreSQL database using TypeORM.
- Swagger documentation for easy API testing and interaction.

## Trade-offs Made

- **Simplicity vs. Complexity**: Aimed for straightforward implementations to meet the requirements within the given time frame. This means some advanced features or optimizations might be missing.
- **Validation**: Focused primarily on critical validations (e.g., order timing conflict). Some additional input validations might be necessary for robustness.

## Assumptions

- **Data Format**: Assumed that the date and time for orders are provided in a standard ISO format.
- **Environment**: Developed and tested in a specific version of Node.js and PostgreSQL. Different environments might require additional configuration.

## Changes for Production

- **Security**: Implement authentication and authorization (e.g., JWT, OAuth).
- **Error Handling**: More comprehensive error handling and logging for debugging and audit trails.
- **Performance Optimization**: Database indexing, query optimization, and caching mechanisms for better performance.
- **Testing**: More extensive unit and integration tests to ensure stability.

## Setup and Running the Project

### Prerequisites

- Node.js (version 18.0 or higher)
- PostgreSQL (version 6.0 or higher)
- npm or yarn

### Installation Steps

Clone the repository:

```bash
git clone [repository-url]
```

Navigate to the project directory:

```bash
$ cd [project-directory]
```

Install dependencies:

```bash
$ npm install
```

- Set up your database and update the database configuration in app.module.ts.
- Running the app

```bash
$ npm run start
```

## Setting Up Swagger

Swagger is configured to run automatically when you start the application.

- Access the Swagger UI at [http://localhost:3000/api](http://localhost:3000/api)

## Completed Specifications

- All CRUD operations for orders and service records.
- Validation for order timing.
- Basic Swagger documentation.
- Basic unit tests for controllers and services.
