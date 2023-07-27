## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## High Level Design

On High level I have created a service which handles all the basic CRUDs mentioned in the task, like GET, POST, PUT, DELETE. I have choosen for the postgres as my primary db because the data is relatable and it makes better sense to use sql when dealing with relational data as order data is related to services.

I have created custom exception filter in the code which handles errors from central message place, which is good for production. I have created three different config env for different environment like local, staging and production.

Added one test to showcase the jest.

I have use request DTOs to handle request validation.

I have used typeorm to design DB schema, it enables us to migrate from different DB to new DB easily. I have choosen nest.js as framework which enables us to code by following SOLID Design patterns.

Trade offs: For the sake of project I havent created a centralized datastore which should have handled all db operations, so that all db operations could be handled from one place. Also in update part of code i need to add the versioning based update to handle dirty updates.


## Installation

```bash
git clone https://github.com/anshulsha/backend-interview

cd backend-interview

sh setup.sh

npm run migration:run (For seeding services in table)

npm run test (To run tests)

```
