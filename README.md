#WIN Assesment Solution

##Description:
Created a order management system for services.
Include:
1. Creating order.
2. Getting all orders.
3. Getting order by order id.
4. Updating Existing Order.
5. Deleting Existing order.

All the api have implemented with proper error handling with proper status codes.

I have Assumed with existing services as 
1. Inspection
2. Testing
3. Analysis
These are hardcoded means in datbase added these values manually.

I have two tables.
1. Orders
Column: id(Integer), totalfee(integer), services(array), datetime.
2. services.
Column: id(Integer), name, fee(integer).

the total amount is calculated as per fee in services table.

user can update order after 3 hours of creating.

##Endpoints:
POST: {{URL}}/api/orders/createOrder

```{
    "services": [1,3, 2]
}```

GET: {{URL}}/api/orders/getOrder/113
GET: {{URL}}/api/orders/getOrder

PUT :{{URL}}/api/orders/updateOrder/110

```{
    "services": [1,3]
}```

DELETE {{URL}}/api/orders/110

##Changes in production.
1. Changing pooling database to ORM.
2. Adding another column in both orders and service as status.
3. Instead of deleting data directly in database will change the status like active and inactive. (Important)
4. Adding authentication.
5. Improving code by making common functions for each operation.

##SETUP

1. Installing all package by running npm install
2. creating env file with below fileds.
```USERNAME
PASSWORD
DATABASE
HOST
DBPORT
PORT
```
npm run start to run the server.
npm test to make functional testing.

Completed all the parts except sending error if creating order within 3 hours.(Implemented for updating within 3 hours)

After making setup spent aroung 2 hours to 2 hours 30 min.
writing query which can be run on node made problamatic.
