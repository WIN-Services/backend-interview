# Order Management System

- A simple implementation of order management system using "Nest.JS" for backend server and "MongoDB" for database. also added "Dockerfile" to run it independently on any platform.

## Folder Structure

- [X] src
    - [X] **common** : Having the global response interceptor.
    - [X] **config** : Contains configuration and required secret for the service.
    - [X] **errors**: To handle the error and throw customized error response.
    - [X] **health**: Health Check Module to return the running status of the service.
    - [X] **jwt**: JWT Module to generate the token for the authenticated user.
    - [X] **orders** : Orders Management Module
        - [X] **dto** : Data transfer object for api
        - [X] **entities** : Database schema and document.
        - [X] **repository** : Database Model Implementation.
        - [X] **controller** : Routing the request.
        - [X] **provider**: Business logic for each api to manage orders.
    - [X] **product-service** : Product service Module to manage all the products
        - [X] **dto** : Data transfer object for api
        - [X] **entities** : Database schema and document.
        - [X] **repository** : Database Model Implementation.
        - [X] **controller** : Routing the request.
        - [X] **provider**: Business logic for each api to manage product and services.
    - [X] **role**: Role Based Authentication: PUBLIC, CUSTOMER, ADMIN
    - [X] **App** : App Module to manages the implementation of all the internal modules.
    - [X] **main**: Act as main module that have implementation app server and running it to a port.

## Steps to start application:
 - `docker-compose up` : This command will start the server on any machine docker container.
 - Visit Swagger Document for the APIs :`http://localhost:3000/orders-management-system/api` .
