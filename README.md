# Order Management System

## Tech Stack Used:

- **Nest JS :** => A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- **MongoDB:** => MongoDB is a source-available cross-platform document-oriented database.
- **Docker**  => Docker is an open platform for developing, shipping, and running applications.
- **Docker Compose** => Docker Compose is a tool that was developed to help define and share multi-container applications.

## Folder Structure

- [X] src
    - [X] **common** : Include request interceptor.
    - [X] **config** : Manage the configuration of the service. ie: port , app name , db url , app key etc.
    - [X] **enums**: Constant value used in project.
    - [X] **errors**: A api for making generic error in whole project.
    - [X] **health**: For health check of system which include db health check and etc.
    - [X] **oms** : Order Management Module
        - [X] **dto** : Data transfer object for api
        - [X] **entity** : Database schema.
        - [X] **controller** : Routing
        - [X] **provider**: Business logic for the application.
    - [X] **role**: Role Based Access: public api , platform api, admin api
    - [X] **utils**: Common maths.
  

## Steps to start application:
 - `docker-compose up` : This command will spin up the server.
 - After spinning up the server. Visit `http://localhost:3000/api/` for swagger document of an api.
![alt text](images/win.png)

## Assumption while developing
- I believe that price of order will be dependent on services. So i have added amount field to service/orderitem.
- The summation of item price will be the order price.


## Changes While Moving to prod.

### Before Moving to prod we need to complete unticked item. 

- [X] Health Check 
- [X] Request validation
- [X] Cors Whitelisting
- [X] Rate Limiting/Throttling : 100000 request per min is current limit.
- [ ] Request Size Limit : Before moving to prod we need to add request size limit.
- [X] Linter
- [ ] Open Tracing and Telemetry: before moving to prod we need to add tracing and telemetry.
- [X] ContentSecurityPolicy
- [X] CrossOriginEmbedderPolicy
- [ ] Test Covergae > 95 : Before moving to prod we need to reach maximum of coverage
- [X] Code Cleaning
- [ ] Multi Core Deployment :  Before moving to prod we can deploy our code to multicore system so that it can accept maximum amount of request.
- [ ] Add Authentication and Authorization

## API's

- **POST: Create Order** `/oms/v1/order-management`

```curl
   curl --location --request POST 'http://localhost:3000/oms/v1/order-management' \
--header 'Authorization: 1510480e-d9f2-11ed-afa1-0242ac120002' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user_id": "Atul",
    "order_items": [
        {
            "name": "Pencil",
            "amount": 12
        },
       {
            "name": "Pen",
            "amount": 13
        }
    ]
}'

```

- **PUT: Update Order** `/oms/v1/order-management`

```curl

curl --location --request PUT 'http://localhost:3000/oms/v1/order-management' \
--header 'Authorization: 1510480e-d9f2-11ed-afa1-0242ac120002' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "db664fd7-a000-4f01-a72e-1993d4a91c06",
    "order_items": [
        {
            "name": "Pen",
            "amount": 12
        },
        {
            "name": "Pencil",
            "amount": 13
        }
    ]
}'

```


- **Get: Get Order** `/oms/v1/order-management`

```curl
curl --location --request GET 'http://localhost:3000/oms/v1/order-management?id=115db568-a7b5-4c1d-854d-075b598d0566' \
--header 'Authorization: 1510480e-d9f2-11ed-afa1-0242ac120002' \
--data-raw ''

```

- **Get: Get All Orders** `/oms/v1/order-management/orders`

```curl
curl --location --request GET 'http://localhost:3000/oms/v1/order-management/orders?page=0&page_size=10' \
--header 'Authorization: 115db568-a7b5-4c1d-854d-075b598d0566'
```




***




