

## Description

This is a web service for order management for an internal team.
Tech stack used:-

[Nest](https://github.com/nestjs/nest) framework

[TypeScript]() laguage

[Jest]() for testing

[Postgresql]() database

[Typeorm]() Orm

The reason of using a combination of typescript and nestjs is that it provides us to write code in a structural way. It gives us the advantage of using classes, Dtos, interfaces, modules etc. to reduces inconsistencies in the code. It allows us to keep our code well structured and maintainable.

## Installation

Go to the root directory and run following command.
```bash
$ npm install
node version 16
```

## Running the app

```bash
# development
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test
```
## Problem statement assumption
The basic assumption behind the problem statement  is that there are orders of a product which belong to a unique service type. And other teams should be able to see the order information 

## Goal
After completion of the project there will be a fully functional internal webservice(restful architecture) available to the teams which the can use to access and edit information

## Webservice overview

1.  This webservice has 2 models.
    - Order : this is considered as a document having details of a general order. Every order will have a unique id.
    - Service: this is considered as a service type to which an order can ne mapped.Every service will have a unique name.
```bash
# Order Schema
{
  id: number; (unique)
  dateTime: Date;
  totalFee: number;
  serviceId: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

# Service Schema
{
  id: number; (unique)
  name: string; (unique)
  createdAt: Date;
  updatedAt: Date;
}
```

2.  In this webservice there are functionalities to add, update, delete, get all and get a single record. These have been implemented to both orders and services.
3.  Methods used are POST, PUT, GET, DELETE.
4.  There are in total 10 apis in the webservice 5 each for order and services.
5.  Following are the functionalities for Orders
    - `addOrder` > to create a new order
    - `updateOrder` > to update an existing order only of it was created 3 hours before.
    - `getAllOrder`> to fetch all the orders
    - `getOrderById`> to get 1 perticular order
    - `deleteOrder`> to delete an order
6. Following are the functionalities for Service
    - `addService` > to create a new Service checking uniqueness of the service name.
    - `updateService` > to update an existing Service checking uniqueness of the service name.
    - `getAllService`> to fetch all the Services
    - `getServiceById`> to get 1 perticular Service
    - `deleteService`> to delete a Service
6.  Since all are internal apis are to be used by internal teams, all the apis are guarded with an `internal api key` which is kept inside .env file. You can change its value according to your convenience
it is necessary to pass `internal-api-key` inside headers to access the apis.
7. `Jest` has been used to write the test cases. to run test run `npm run test`
    

## Apis overview

1.  `addOrder`
    - endpoint -> `localhost:3000/order` method POST
    ```ruby
    curl --location --request POST 'localhost:3000/order' \--header 'internal-api-key: abcd' \--header 'Content-Type: application/json' \--data-raw '{
    "dateTime":"2022-11-01T11:11:11.111Z",
    "totalFee":4000,
    "serviceId":70
    }'
    ``` 
2. `updateOrder` 
   -  endpoint -> `localhost:3000/order/:id` method PUT
    ```ruby
    curl --location --request PUT 'localhost:3000/order' \--header 'internal-api-key: abcd' \--header 'Content-Type: application/json' \--data-raw '{
    "dateTime":"2022-11-01T11:11:11.111Z",
    "totalFee":4000,
    "serviceId":70
    }'
    ``` 
3.  `getAllOrders` 
   -  endpoint -> `localhost:3000/order` method Get


   ```ruby
   curl --location --request GET 'localhost:3000/order' \--header 'internal-api-key: abcd' \--header 'Content-Type: application/json'
   ``` 
4. `getOrderById` 
   -  endpoint -> `localhost:3000/order/:id` method Get
   ```ruby
   curl --location --request GET 'localhost:3000/order/1' \--header 'internal-api-key: abcd' \--header 'Content-Type: application/json'
   ```
5.  `deleteService` 
   -  endpoint -> `localhost:3000/order/:id` method Delete
      ```ruby
      curl --location --request DELETE 'localhost:3000/order/1' \--header 'internal-api-key: abcd' \--header 'Content-Type: application/json'
      ``` 
6.  `addService`
    - endpoint -> `localhost:3000/service` method POST
    ```ruby
    curl --location --request POST 'localhost:3000/service' \--header 'internal-api-key: abcd' \--header 'Content-Type: application/json' \--data-raw '{
    "name":"analysis"
    }'
    ``` 
7. `updateService` 
   -  endpoint -> `localhost:3000/service/:id` method PUT
    ```ruby
   curl --location --request PUT 'localhost:3000/service/8' \--header 'internal-api-key: abcd' \--header 'Content-Type: application/json' \--data-raw '{
    "name":"analysisq"
    }'
    ``` 
8.  `getAllServices` 
   -  endpoint -> `localhost:3000/service` method Get
        ```ruby
        curl --location --request GET 'localhost:3000/service' \--header 'internal-api-key: abcd' \--header 'Content-Type: application/json
        ``` 
9. `getServiceById` 
   -  endpoint -> `localhost:3000/service/:id` method Get
        ```ruby
        curl --location --request GET 'localhost:3000/service/1' \--header 'internal-api-key: abcd' \--header 'Content-Type: application/json'
        ``` 
10.  `deleteService` 
     -  endpoint -> `localhost:3000/service/:id` method Delete
        ```ruby
        curl --location --request DELETE 'localhost:3000/service/1' \--header 'internal-api-key: abcd' \--header 'Content-Type: application/json'
        ```
## Important points for setup

1. Env file has been added in the project.
2. You will have to add a database named `randomDb`, run `npm i` and the run `npm run start:dev`.
