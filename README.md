# Order Management Project

This repository contains the source code for the Order Management application, which includes both a backend API and associated database operations.

## Installation and Setup

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- PostgreSQL

### Clone the Repository

Clone this repository to your local machine:

```
git clone https://github.com/WIN-Services/backend-interview.git
```

### Backend Setup

1. Open a terminal window.

2. Navigate to the project's root directory:

3. Install the required dependencies:

```
npm install
```

4. Create a `.env` file in the project's root directory and provide the necessary PostgreSQL database credentials:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=your-database-name
POSTGRES_DIALECT=postgres
```

5. Migrate the database to create tables and associations:

```
npm run migrate
```

6. Seed the database with sample data to get started:

```
npm run seed
```

7. Start the backend server:

```
npm start
```

8. To run test cases:

```
npm test
```

The backend server will be running on http://localhost:3000.

### Accessing the Application

The backend API provides dynamic routing under the base URL `/api/`. For order routes, add `/order/` to the base URL. For service routes, add `/service/` to the base URL.

## API Routes

### Order Routes

- **GET /api/order/**
  - Retrieve a list of all orders.
  - Sample Response (Success):
    ```json
    {
      "status": "success",
      "message": "All orders fetched successfully.",
      "data": [
        {
          "id": 1,
          "date_time": "2022-08-10T08:00:00.000Z",
          "total_fee": 100,
          "services": [ ... ]
        },
        // ... more orders
      ]
    }
    ```
  - Sample Response (Error):
    ```json
    {
      "status": "error",
      "message": "Order not found.",
      "data": []
    }
    ```

- **GET /api/order/:orderId**
  - Retrieve a specific order by ID.
  - Sample Response (Success):
    ```json
    {
      "status": "success",
       "message": "Order fetched successfully.",
      "data": {
        "id": 1,
        "date_time": "2022-08-10T08:00:00.000Z",
        "total_fee": 100,
        "services": [ ... ]
      }
    }
    ```
  - Sample Response (Error):
    ```json
    {
      "status": "error",
      "message": "Order not found",
      "data": []
    }
    ```

- **POST /api/order/**
  - Create a new order.
  - Sample Request Body:
    ```json
    {
      "date_time": "2022-08-15T10:00:00.000Z",
      "total_fee": 150,
      "service_ids": [1, 2, 3]
    }
    ```
  - Sample Response (Success):
    ```json
    {
      "status": "success",
      "message": "Order created successfully.",
      "data": {
        "id": 2,
        "date_time": "2022-08-15T10:00:00.000Z",
        "total_fee": 150,
        "services": [ ... ]
      }
    }
    ```
  - Sample Response (Error):
    ```json
    {
      "status": "error",
      "message": "Invalid service IDs provided",
      "data": []
    }
    ```

- **PATCH /api/order/:orderId**
  - Update a specific order by ID.
  - Sample Request Body:
    ```json
    {
      "date_time": "2022-08-20T12:00:00.000Z"
    }
    ```
  - Sample Response (Success):
    ```json
    {
      "status": "success",
      "message": "Order updated successfully.",
      "data": []
    }
    ```
  - Sample Response (Error):
    ```json
    {
      "status": "error",
      "message": "Cannot update within 3 hours of pre-existing order",
      "data": []
    }
    ```

- **DELETE /api/order/:orderId**
  - Delete a specific order by ID.
  - Sample Response (Success):
    ```json
    {
      "status": "success",
    }
    ```
  - Sample Response (Error):
    ```json
    {
      "status": "error",
      "message": "Order not found",
      "data": []
    }
    ```

### Service Routes

- **GET /api/service/**
  - Retrieve a list of all services.
  - Sample Response (Success):
    ```json
    {
      "status": "success",
      "message": "All services fetched successfully.",
      "data": [
        {
          "id": 1,
          "name": "Service A"
        },
        // ... more services
      ]
    }
    ```
  - Sample Response (Error):
    ```json
    {
      "status": "error",
      "message": "Service not found.",
      "data": []
    }
    ```

- **GET /api/service/:serviceId**
  - Retrieve a specific service by ID.
  - Sample Response (Success):
    ```json
    {
      "status": "success",
      "message": "Service fetched successfully.",
      "data": {
        "id": 1,
        "name": "Service A"
      }
    }
    ```
  - Sample Response (Error):
    ```json
    {
      "status": "error",
      "message": "Service not found.",
      "data": []
    }
    ```

- **POST /api/service/**
  - Create a new service.
  - Sample Request Body:
    ```json
    {
      "name": "Service D"
    }
    ```
  - Sample Response (Success):
    ```json
    {
      "status": "success",
      "message": "Service created successfully.",
      "data": {
        "id": 4,
        "name": "Service D"
      }
    }
    ```
  - Sample Response (Error):
    ```json
    {
      "status": "error",
      "message": "Service already exists.",
      "data": []
    }
    ```

- **PATCH /api/service/:serviceId**
  - Update a specific service by ID.
  - Sample Request Body:
    ```json
    {
      "name": "Updated Service A"
    }
    ```
  - Sample Response (Success):
    ```json
    {
      "status": "success",
      "message": "Service updated successfully.",
      "data": []
    }
    ```
  - Sample Response (Error):
    ```json
    {
      "status": "error",
      "message": "Requested services name already exists.",
      "data": []
    }
    ```

- **DELETE /api/service/:serviceId**
  - Delete a specific service by ID.
  - Sample Response (Success):
    ```json
    {
      "status": "success"
    }
    ```
  - Sample Response (Error):
    ```json
    {
      "status": "error",
      "message": "Service not found.",
      "data": []
    }
    ```
