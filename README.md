# Description

Designed order management system which inclues crud operations with expressjs framwork

Database-Mysql,sequelize

language-typescript,javascript

# Assumptions

Every service will be added from ui with the help of an api,so i wrote an api to add service with defined fees.

# setup instructions

colne the project from feature/ordermanagement-win branch
Run npm install for the nodemodules
create an env file and simply copy paste the below lines

PORT=8002
DATA_BASE_NAME=Node
DATA_BASE_USERNAME=root
DATA_BASE_PASSWORD=password
HOST=localhost

run using the command "npm run dev"

For tests use command "npm run test"

# Implemented

implemented orders and service management

1.api/v1/createService(POST api)

description:It takes serviceName and serviceFees from body as parameters and creates a service

Sample Input:

{
"serviceName": "Inspection",
"fees": 250
}

Sample Output:

"data": {
"error": false,
"message": "Service created"
},
"message": "Service created",
"error": false

Edge cases Handled:

Check for the service already added or not.
Accept only if service not exists

2.api/v1/getAvailableServices(GET api)

Description:It takes limit and offset ans parameters from query and returns array os services

Sample output:

        "error": false,
        "data": [
            {
                "serviceId": 1,
                "serviceName": "testing",
                "createdAt": "2024-02-03T04:53:26.000Z",
                "updatedAt": "2024-02-03T04:53:26.000Z"
            },
            {
                "serviceId": 3,
                "serviceName": "Inspection",
                "createdAt": "2024-02-03T04:54:03.000Z",
                "updatedAt": "2024-02-03T04:54:03.000Z"
            },
            {
                "serviceId": 5,
                "serviceName": "Inspections",
                "createdAt": "2024-02-03T05:14:47.000Z",
                "updatedAt": "2024-02-03T05:14:47.000Z"
            }
        ],
        "message": "Services fetched"

3.api/v1/createOrder(POST api)

Description:Created order with a particular service for an user.It takes serviceId,userId,as parameters from body.

Assumptions:Users table is there and providing userId from users table to create order api.

Sample input:

{
"userId": "124",
"service": 3
}

Sample output:

"data": {
"error": false,
"message": "Order created succesfully"
},

Edge cases handled:
1.checking service existance before creating order
2.Not accepting if the service is not in service table.
3.Fee calculation for new service additions.
4.Making the user wait 3 hours from last creation and updation.

4.api/v1/getAllOrders(GET api)
Description:Fetches all orders made by user by taking limit and offset in query params

Sample output:

{
"data": {
"error": false,
"data": [
{
"orderId": "1851e1be-18ef-48ca-a3d2-9636cb70fcd3",
"userId": "123",
"totalFees": 100,
"services": [
{
"serviceId": 1
}
],
"createdAt": "2024-02-03T06:16:17.000Z",
"updatedAt": "2024-02-03T06:16:17.000Z"
},
{
"orderId": "7bea547d-4044-42ec-ade5-8a4dce03993f",
"userId": "123",
"totalFees": 100,
"services": [
{
"serviceId": 3
}
],
"createdAt": "2024-02-03T05:56:37.000Z",
"updatedAt": "2024-02-03T05:56:37.000Z"
},
{
"orderId": "ec2d25d9-2888-4084-b960-c369ef7b3ed6",
"userId": "123",
"totalFees": 100,
"services": [
{
"serviceId": 1
}
],
"createdAt": "2024-02-03T05:38:33.000Z",
"updatedAt": "2024-02-03T01:38:33.000Z"
}
]
},
"message": "Orders fetched ",
}

5.api/v1/removeService(PATCH api)

Description:it manages the services in a particular order means removes the service and also deducts the service fees from total fees.Takes input as orderId and service.

sample input:

{
"orderId": "9e517f54-643e-415a-89eb-0b041372a557",
"service": 1
}

Sample output:

{
"message": "Order updated",
"error": false
}

6.api/v1/deleteOrder(POST api)

Description:It directly deletes the order and takes order id as parameter

sample input:

{
"orderId":"1851e1be-18ef-48ca-a3d2-9636cb70fcd3"
}

sample output:

"data": {
"error": false,
"message": "Order deleted succesfully"
},


# Enhancements can be done

1.If we use redis cache for time storing purpose it will be faster as no database call required

2.As these apis are not protected better to protect every api with gaurds and will be safer from any threats

3.If we use UserService model for maintianing user service relation we can directly rely on that model.

5.If we provide an option wishlist so that they can add the service to cart anytime.