# WIN Backend Engineering Interview

## General Info

1. language used: JS
2. Runtime: NodeJs
2. framework used: Express
3. database: MongoDb 

## Setup
- clone the repo
- create .env file and paste all constants from dotenv-example file
- run "npm i" to install packages
- run "npm start" to start server
- run "npm test" to run test cases


## How it works

REST Endpoints 
server: localhost:3000

## Service

1. To Add the new service : http://localhost:3000/service/create

2. To List All the service: http://localhost:3000/service/all
    
3. To Update the service : http://localhost:3000/service/update/:id

  
4. To Delete the service with : http://localhost:3000/service/delete/:id
    
5. To Get the service with id : http://localhost:3000/service/:id

## Orders

1. To Add the Order : http://localhost:3000/order/create

2. To List All the Orders: http://localhost:3000/order/all
    
3. To Update the Order : http://localhost:3000/order/update/:id

  
4. To Delete the Order with : http://localhost:3000/order/delete/:id
    
5. To Get the Order with id : http://localhost:3000/order/:id

## Postman example
- http://localhost:5000/order/create
```json
{
    "id": "5",
    "totalfee": "200",
    "services": [
        {
            "id": "12"
        }
    ]
}
```
## Scripts
start: npm start
test: npm test

## Structure

```json
service: {
	id: int,
	name: string
}
```
```json
order: {
	id: int,
        datetime: timestamp,
        totalfee: int,
        services: [
        	{
                    id: int (linked to service)
                }
        ]
}
```



