# WIN Backend Task

### Stack Used
- NestJS framework running on top of NodeJS with Typescript
- PostgreSQL as Database
- Jest as Testing framework

### How to Run
- First Create a DB and add the DB credentials to a `.env` file (create it under root directory and populate it in the following manner
```
	DB_HOST=localhost  
	DB_PORT=5432  
	DB_USER=postgres  
	DB_PASSWORD=postgres  
	DB_DBNAME=windb
```
- Create the following tables in the DB using following DDL
```
create table "Service"
(
    id             character varying(18) primary key not null,
    name           character varying(255)            not null,
    description    text,
    fee            double precision                  not null,
    "currencyCode" character varying(3)              not null,
    "dateCreated"  timestamp with time zone          not null default now(),
    "dateUpdated"  timestamp with time zone          not null default now()
);

create table "Order" (
  id character varying(16) primary key not null,
  status character varying(10) not null,
  "dateCreated" timestamp with time zone not null default now(),
  "dateUpdated" timestamp with time zone not null default now()
);

create table "OrderService" (
  "orderId" character varying(16) not null,
  "serviceId" character varying(18) not null,
  "dateCreated" timestamp with time zone not null default now(),
  "dateUpdated" timestamp with time zone not null default now(),
  foreign key ("orderId") references public."Order" (id)
  match simple on update cascade on delete cascade,
  foreign key ("serviceId") references public."Service" (id)
  match simple on update cascade on delete cascade
);


```
- To start the NodeJS App, run the following commands
    - `npm install`
    - `npm run build`
    - `npm run start:prod`

- To run the Tests, run the following command
    - `npm install`
    - `npm run test`

- To test the APIs, you can use the following Postman Collection:
  https://documenter.getpostman.com/view/30029103/2s9YR85E3W


- How it works
    - Database Schema
        - All the Tables have dateCreated and dateUpdated column to properly manage the timestamps when a particular record was created or updated
        - The Order Table store the data related to Order like id and status
            - Can be extended with new Columns
        - The Service Table store the data related to Service like id, name, description, fee, currencyCode of the fee
            - Can be extended with new Columns
        - The OrderService Table store the data related to Services present in an Order
            - Can be extended with new Columns to store mapping specific data like count of services availed in a order
    - APIs
        - We have 5 API endpoints for Order
            - POST /order to create a new order
            - GET /order/all to get all orders
            - GET /order/:orderId to get a specific order
            - PUT /order/:orderId to update a specific order
            - DELETE /order/:orderId to delete a specific order
        - We have 1 more API endpoint for Services
            - GET /service to get all services

- Changes to be done before releasing to PROD
    - I will add multiple environment configuration using NODE_ENV to get the environment and properly set the credentials according to it
    - Discard usage of .env and instead use something like AWS SecretsManager to better safegaurd the Database Credentials