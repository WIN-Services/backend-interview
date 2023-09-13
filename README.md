# WIN Backend Engineering Interview

## How to start the application

To start the service, run docker-compose up .

Next Step is to set up the migrations and seeding, do a get request from web brower.

```
 http://localhost:3000/migrate
```
## Web Service

The web service already has pre-defined services. Each service has a name and a fee. To create orders, services need to be put in the request body, the total fee for each order would be the sum of each service ordered in the order. 

For eg, There are 3 services with following name and fees
```
    Service 1 -  Id : 1, Name: Testing, Fee: 100
    Service 2 -  Id : 2, Name: Inspection, Fee: 200
    Service 3 -  Id : 3, Name: Analysis, Fee: 150
```

A user creates a order with Service Id - 1 and Service Id - 2, then the order would be created totalfee would be sum of fee service id 1 and 2 - 300

```
    Order - Services : [{id : 1, name: Testing}, {id : 2, name: Inspection}], totalfee : 300
```


 - The web service displays all the services available - get /service
 - The web service displays all the orders - get /order
 - You can search the service by service id - get /service/:service_id
 - You can search the order by order id - get /order/:order_id
 - You can create new orders - post /order
 - You can modify existing orders - put /order/:order_id
 - You can delete existing orders - delete /order/:order_id


## Testing

The coverage of the project has been convered using integration tests. Frameworks used are supertest and jest. To check test coverage : 

```
npm run test:cov
```

### Collections

The API collection are in the folder collection. The JSON can be viewed using postman tool.


### Web Service Endpoints

```
GET /migrate
GET /order
GET /order/:order_id
GET /service
GET /service/:service_id
POST /order
PUT /order
DELETE /order/:order_id 
```


