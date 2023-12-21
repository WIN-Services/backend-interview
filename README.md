# Order Management System

Welcome to the Order Management System (OMS) application! This system is designed to manage orders and services using a PostgreSQL database and an Express.js backend using PrismaORM.

## Installation

Follow these steps to install and set up the application:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/goropencho/backend-interview.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd backend-interview
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Configure the database:**

   - Create .env file containing the database url along with the password. Refer .env.example file.

5. **Run the database migrations:**

   ```bash
   npm run migrate
   ```

6. **Start the application:**

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

## API Endpoints

### Orders

- **GET /orders**: Get a list of all orders.

- **GET /orders/:id**: Get details of a specific order.

- **POST /orders**: Create a new order. Requires a JSON payload with order details.

- **PUT /orders/:id**: Update details of a specific order. Requires a JSON payload with updated order details.

- **DELETE /orders/:id**: Delete a specific order.

### Services

- **GET /services**: Get a list of all services.

## Folder Structure

```
backend-interview/
|-- prisma/
|   |-- migrations/
|   |   |-- ...                # Database migration files
|   |-- schema.prisma          # Database Schema
|   |-- seed.js          # Seed Services

|-- controllers/
|   |-- order.js           # Order controller
|   |-- service.js         # Service controller
|-- routes/
|   |-- orders.js     # Order-related routes
|   |-- services.js   # Service-related routes
|-- package.json
|-- README.md
|-- server.js              # Entry point for the application
```

Feel free to explore and enhance the functionality of this Order Management System as needed for your specific use case. If you have any questions or issues, please don't hesitate to reach out!