

DESCRIPTION
created order management system to create order for multiple services . The system include APIs to get order details, create order, update order, and delete order .

TECHNOLOGIES USED 
NestJS, ExpressJS, MySQL, TypeORM

ASSUMPTIONS MADE
1. Requests are already authenticated
2. services are already created in databases and no need to seperate create service api
3. the 3 hr condition for the creation of order is applicable only if the services requested in create order request are already requested in another order which is created less than 3 hr before this order 



