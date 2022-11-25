# WIN Backend Engineering Interview

## Scenario

Your mission is to build a portion of an order management system. You need to provide a service that allows other systems and teams to obtain information about orders.

## Deliverables

There are two deliverables for this project:

1. An internal web service API for managing orders
2. A test suite to validate the web service and library work as expected

### Description

- Languages Used => Node.Js , JavaScript 
- Database => Mongo DB

In this Created two table for the project one is order table for creating order and with that we are saving the particular service id with it and other is service table to store different services.



In this i have created below  requests =>

1) Post Request (For creating the order) => /create_order 
    In payload => {
    "service_id":9,
    "totalfee":10254
     }
	 
	 the above order will be created if last created order is before 3 hours.
	 
2) Post Request (For creating the services) => /create_services 
    In payload => {
    
    "name":"Testing"
   }
	 
	 the requested service will be created.
	 
3) PUT Request (updating order) => /update_order
   Payload => {
    "_id":8,
    "totalfee":10001
    }
	
	The above order will be updated.
	
4) PUT Request (updating service) => /update_services
   {
    "name":"Testing1",
    "_id":1
   }
	
	The above service will be updated.
	
5) PUT Request (delete service) => /delete_services
   Payload => {
    "id":2
}
	
	The above service  will be deleted.
	
6) PUT Request (deleting order) => /delete_order
 Payload=>  {
    "id":2
   }
	
	The above order will be deleted.

7) GET Request (get all services) => /get_all_services
   will give all services in database.
	
8) GET Request (get all orders) => /get_all_orders
 	will give all orders in database.
	


## Setup
   1. I cloned the branch
   2. run command npm i install
   
## Submission
   1. Creation of API's hardly took 1.5 hour 
   2. But Setup and Commiting changes took 1.5 hour.
   3. All api's were not that much difficult.