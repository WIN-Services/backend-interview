**Backend assessment – Order management system**

**Description**

Developed order management system using **Nodejs** with **express** framework. Used **mongoDb** for database and **jest** for writing tests.

**Assumptions**

- Endpoints to update, delete, get, get all, services is implemented, so that only valid service's id can be used while placing order.
- First add services then add these services ids in payload of order apis.
- Apart from this, no assumption made, just be sure to first add some services and then only hit order apis. Service ids in the payload has to be valid, that is, service table should contain the id that will be sent in payload of order apis. (please refer to demo endpoint below)

**Changes for production**

- Implementing user authentication and authorization.
- Error handling
- Using cloud to store environment variable (aws secret manager)

**Setup Instructions**

- Clone repo
- Switch to node version 16.8.0
- Run npm install
- Rename .env.example to .env for db url, or attach your own mongodb connection string.
- npm start

**Running Test**

Run npm test

**Specs and time spent**

- All CRUD operations and 3 hours barrier for order update/create

implemented.

- Additionally, service endpoints are also implemented, for dynamic service ids
- Check for valid services also implement, that is, add valid service ids in payload of order apis.
- Time spent: 5 hours (Approx)
- Challenges while writing test.

**DEMO Endpoints**

**Create Service**

**POST** /service/create

**Payload**

{

"name":"demo service"

}

**Get all services**

**GET** /service/getall

**Update services**

**PUT** /service/update

**Payload**

{

"name":"demo service 1", "id": "65a78e468c985775c68957da"

}

**Delete service**

**DELETE** /service/delete

{

"id": "65a78e468c985775c68957da"

}

**GET service by id**

**GET** /service/get

**Payload**

{

"id": "65a78e468c985775c68957da"

}

**Create Order**

**POST** /order/create

**Payload**

{ "totalfee": 100,

"services": [

{ "id": "65a79383711b17d3e5811dc6" }

] }

**NOTE: id in services array has to be valid**

**Get all orders**

**GET** /order/getall

**Update orders**

**PUT** /order/update

**Payload**

{

"id": "65a7accf9da9fdafd10b29b4",

"totalfee": 101,

"services": [

{ "id": "65a79383711b17d3e5811dc1" }

] }

**Delete orders**

**DELETE** /order/delete

{

"id": "65a78e468c985775c68957da"

}

**GET service by id**

**GET** /order/get

**Payload**

{

"id": "65a78e468c985775c68957da"

}