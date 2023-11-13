
WIN backend assesment

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Environment Variables](#environment-variables)
  - [Run the Service](#run-the-service)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js (version 18.18.0)
- npm (version 9.8.1)
- MongoDB 

### Installation

1. Install dependencies 
   ```bash
        npm install

2. Usage
Environment Variables
   
    Make sure to set the following environment  variables before running the service in .env file:

    PORT: Port number on which the service will run.
    MONGO_URI: MongoDB connection string 
    MONGO_USERNAME : mongo username 
    MONGO_PASSWORD : mongo password

3. Start the service

        npm run start
        The service will be accessible at http://localhost:PORT.

4. API Endpoints

    GET /api/v1/order - get all orders

    POST /api/v1/order - allows createion of order without duplicate id.

    PUT /api/v1/ order/:id - updates order and return an error on updating an order within 3 hrs of a pre-existing orders

    DELETE /api/v1/order:id - deletes a order by given id

    GET /api/v1/:id - gets order by given id

    GET /api/v1/service: gets all services

    GET /api/v1/service/orders/:id - get all orders for a given service id

    DELETE /api/v1/service:id - delete a service by given id

    POST /api/v1/service - creates a unique  service

    PUT /api/v1/service/:id - updates the service by given id


4. Testing

        npm test
5. Docker

            docker-compose up

6. Parts completed

            1. Implemented several endpoints that accept POST, GET, PUT and DELETE requests. Also 1 endpoint that accepts GET all orders.

            2. Handled edge cases appropriately and return appropriate HTTP status codes.

            3.Returning an error on updating an order within 3 hrs of a pre-existing order.

            4.Returning JSON results.
    
            5.Written a test case using jest.


7. What you would change if you built this for production

        1. Would have impelemented authencitation and authorisation for security 

        2. Would have used caching mechanisms to reduce redundant database queries and improve response times.

        3. Set up a continuous integration (CI) pipeline to automate testing and deployment processes

        4. Would likely be using load balancers to distribute traffic across multiple instances of the service.