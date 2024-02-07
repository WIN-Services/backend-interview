# Order and Service Assignment

This project is an assignment for the "Order and Service" module from WIN Services. It is implemented using TypeScript, MongoDB, Express, and Joi for validation.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Postman Collection](#postman-collection)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Order Management:** Allows the creation, retrieval, update, and deletion of orders.
- **Service Management:** Manages various services related to orders.

## Requirements

- **Node.js:** Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **MongoDB:** Install MongoDB and make sure it's running on your local machine or provide connection details for a remote MongoDB server.
- **npm or yarn:** Choose either npm or yarn for package management.

## Getting Started

### Installation

1. Clone the repository:

Install dependencies:

bash
Copy code
npm install
Configuration
Create a .env file in the root directory:
Copy code
PORT=
HOST=
DB_URI=

NODE_ENV=

Usage
Run the application:

bash
Copy code
npm start


API Endpoints

Orders
GET /orders: Retrieve all orders.
GET /orders/:id: Retrieve a specific order by ID.
POST /orders: Create a new order.
PUT /orders/:id: Update an existing order.
DELETE /orders/:id: Delete an order.

Services
POST /services: Create a new service.

### postman collection
https://api.postman.com/collections/18359793-c536fbcd-3410-452a-b3ae-1c7f92db3ab6?access_key=PMAT-01HP10APB0GEBHD830QWXK1ZFX
