
Enviornment : JAVAScript(NodeJs)
FrameWork : ExpressJS
Database : Mongodb

To Start the project run the following command:
"npm start"

postman 
run http://localhost:8000/"servicepath" for service path execution
run http://localhost:8000/order/"orderpath" for order routes execution

to run this project use mongodb uri in server.js file



I created two mongoose schema's 
1. orders - for storing all order data and use get post delete and put method
2. serviceRecords - for storing all service data in mongodb and use get and post method for insert and list of data

 created route folder for storing all path 
1. services - for storing services routes
2. orders - all orders routes

controller/services
All services written inside servicerecordsController file
All order placing services written inside orderServiceController file 


i created get post put delete services and also get service for all order data list and also implement created and updated order after 3 hours condition implemented. I spent 1:30-2:00 hours for this project.