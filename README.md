## Submission

1. Clone this repo
2. Create Web Services and tests
3. Submit a Pull Request (PR)
4. In the PR, include a README that includes the following:- A description of your solution at a high-level, including
   language used, framework used, roughly how it works, etc. - What trade-offs you made - Any assumptions you made that
   affected your solution - What you would change if you built this for production - Brief instructions on how to setup
   the environment to run your project - What parts of the spec were completed, how much time you spent, and any
   particular problems you ran into

## Evaluation

We are looking for:

1. Communication
2. Solution Design
3. Completeness
4. Code clarity / readability

## Description

This is a web service for order management for an internal team.
Tech stack used:-

[Nest](https://github.com/nestjs/nest) framework, [TypeScript]() laguage
, [Jest]() for testing, [Postgresql]() database ,[Typeorm]() Orm

The reason of using nestjs is that it provides us to write code in a structural way. It
gives us the advantage of using classes, Dtos, interfaces, modules etc. to reduces inconsistencies in the code. It
allows us to keep our code well structured and maintainable.

## Notes Before Installation

1. Env file has been added in the project.
2. You will have to add a database named `win`, run `npm i` and the run `npm run start:dev`.

## Installation

Go to the root directory and run following command.

```bash
$ npm install
```

## Running the app on development

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

The basic assumption behind the problem statement is that there are orders of a product which is to be managed by internal teams with permissions to either add, delete, update and read all the orders. This is a backend service for which can either be accessed via postman etc. or a seperate web gui be made with frontend libraries or frameworks like Angular, ReactJs, VueJs etc.

## Goal

After completion of the project there will be a fully functional internal webservice(restful architecture) available to
the teams which the can use to access and edit information

## Webservice overview

1. This webservice is one webservice model.
    - Order : this is considered as a document having details of a general order. Every order will have a unique id.

```bash
# Order Schema
{
  id: number; (unique)
  datetime: Date;
  totalfee: number;
  services: Object[];
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

2. In this webservice there are functionalities to add, update, delete, get all and get a single record.
3. Methods used are POST, PUT, GET, DELETE.
4. There are in total 5 apis in the webservice.
5. Following are the functionalities for Orders
    - `addOrder` > to create a new order
    - `updateOrder` > to update an existing order only of it was created 3 hours before.
    - `getAllOrder`> to fetch all the orders
    - `getOrderById`> to get 1 perticular order
    - `deleteOrder`> to delete an order
6. Since all are internal apis are to be used by internal teams, all the apis are guarded with an `internal api key`
   which is kept inside .env file. You can change its value according to your convenience
   it is necessary to pass `internal-api-key` inside headers to access the apis.
7. `Jest` has been used to write the test cases. to run test run `npm run test`

## Overview of Orders Api

1. `addOrder`
    - endpoint -> `localhost:3000/orders` method POST
   ```ruby
   curl --location --request POST 'localhost:3000/orders' \--header 'internal-api-key: win-assessment' \--header 'Content-Type: application/json' \--data-raw '{
   "datetime":"2022-11-01T11:11:11.111Z",
    "totalfee":4000,
    "services": [{"id": 70}]
   }'
   ``` 
2. `updateOrder`
    - endpoint -> `localhost:3000/orders/:id` method PUT
    ```ruby
    curl --location --request PUT 'localhost:3000/orders' \--header 'internal-api-key: win-assessment' \--header 'Content-Type: application/json' \--data-raw '{
    "datetime":"2022-11-01T11:11:11.111Z",
    "totalfee":4000,
    "services": [{"id": 70}]
    }'
    ``` 
3. `getAllOrders`
    - endpoint -> `localhost:3000/orders` method Get
   ```ruby
   curl --location --request GET 'localhost:3000/orders' \--header 'internal-api-key: win-assessment' \--header 'Content-Type: application/json'
   ``` 

4. `getOrderById`
    - endpoint -> `localhost:3000/orders/:id` method Get
   ```ruby
   curl --location --request GET 'localhost:3000/orders/1' \--header 'internal-api-key: win-assessment' \--header 'Content-Type: application/json'
   ```
4. `deleteOrder`
    - endpoint -> `localhost:3000/orders/:id` method Delete
   ```ruby
   curl --location --request GET 'localhost:3000/orders/1' \--header 'internal-api-key: win-assessment' \--header 'Content-Type: application/json'
   ```