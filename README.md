# WIN Interview

## General Info

1. language used: JS
2. Runtime: NodeJs
2. framework used: Express
3. database: MongoDB

## Setup
- clone the repo
- run "npm i" to install packages
- run "node server.js" or "nodemon server.js" to start server
- cd to test folder and run "node test.js" to run test cases


## How it works

REST Endpoints 
server: localhost:3000

## Service

1. To Add the new service : http://localhost:3000/service/create

2. To List All the service: http://localhost:3000/service/all?page=10&limit=0
    
3. To Update the service : http://localhost:3000/service/update/:id

4. To Delete the service with : http://localhost:3000/service/delete/:id
    
5. To Get the service with id : http://localhost:3000/service/:id

## Orders

1. To Add the Order : http://localhost:3000/order/create

2. To List All the Orders: http://localhost:3000/order/all?page=10&limit=0
    
3. To Update the Order : http://localhost:3000/order/update/:id

4. To Delete the Order with : http://localhost:3000/order/delete/:id
    
5. To Get the Order with id : http://localhost:3000/order/:id

## Postman example
- http://localhost:5000/order/create
```json
{
    "service_id" : "63ade9ce96bcd73f926c0ebe",
    "totalfee" : 102
}
```

## Structure

```json response
{
    "status": true,
    "message": "Order Created Successfully",
    "data": {
        "totalfee": 102,
        "services": [
            "63ade9ce96bcd73f926c0ebe"
        ],
        "_id": "63adf7eb8198ef881a212cdb",
        "datetime": "2022-12-29T20:26:19.546Z",
        "createdAt": "2022-12-29T20:26:19.552Z",
        "updatedAt": "2022-12-29T20:26:19.552Z"
    }
}
```
