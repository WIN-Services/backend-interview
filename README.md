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

 ## Assumption behind the Order Management System:
  - the logic for placing an order. It takes information about the products or services to be included in the order, fetches details about these items, calculates the total price, and then creates an order with the specified customer ID. If any issues occur during this process, it logs an error and communicates that something went wrong using an HTTP error response. The ultimate result is the creation of an order, which is then returned.


## Modification needed while deploying to prod.
  - [X] Health Check 
  - [X] Request validation
  - [X] Cors Whitelisting
  - [X] Logger.
  - [ ] Add Authentication and Authorization
  - [ ] Perform load testing and creating benchmarking.
  - [X] Rate Limiting/Throttling : 100000 request per min is current limit.
  - [ ] Request Size Limit : Before moving to prod we need to add request size limit.
  - [X] Linter
  - [ ] Open Tracing and Telemetry: before moving to prod we need to add tracing and telemetry.
  - [ ] Test Covergae > 95 : Before moving to prod we need to reach maximum of coverage
  - [X] Code Refactoring
  - [ ] Multi Core Deployment :  Before moving to prod we can deploy our code to multicore system so that it can accept maximum amount of request.

###  Features that can be integrated in this service:
  - User management system
  - Authentication system
  - Payment Controller or Third Party Payment Integration.
  - Built in cart managment service and many more.
  - If Traffic Grows, we can subtitute the service in microservices.