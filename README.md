- A description of your solution at a high-level, including language used, framework used, roughly how it works, etc.


  - The service has been written in javascript.
  - The framework used is express
  - Database used is MongoDB Atlas
  - There are total of 5 apis that point to the "order" collection
  - There is just one api that point to the "service" collection
  - Code structure:
      - There is a server.js file that exposes my app. There is a route layer(routes folder) behind it. 
      - Behind the routes folder , we have a controller layer, which shows the control in the APIs
      - There is a service layer behind the controller layer that contains the business logic
      - There is a repository layer, which is a DAL for the corresponding collections
      - There is a helper folder that contains the helper functions that can be used by DAL for data extraction from the collection
      - There is a middleware folder that contains the middleware functions which act on the corresponding APIs
      - There is a util folder that contains the joi schema which is used for validation of the input params and the body in the requests
      - There is a test folder that contains the test functions
      - There is a docker file from which an image can be build and the server can  be deployed in a container
      - There is a .dockerignore file



- Brief instructions on how to setup the environment to run your project
  - To put up the server, you should use the following steps:
      - You should have NodeJS version 18(That is what is being used locally by me), Base image of node 18 has been used in the docker file
      - Install the dependencies: npm i 
      - run the server locally:  node ./server.js   . Please note that you should be inside the root folder to run this command.
  

  - If you want to run the server inside a container, run the following commands:
      - docker build -t winhome .
      - docker run -p 3000:3000 winhome

  - Either way the server will be up and you can hit the curls from postman. I'm posting the curls at the bottom



- What trade-offs you made
  - The tradeoff made was that I wrote end to end test cases. The unit tests should have been written as well. 
  

- Any assumptions you made that affected your solution   
  - I should have added jsdoc as well  
  
      
- What you would change if you built this for production
  - I have exposed my MongoDB Atlas in the code. It should never happen in production. Only the devops team or very few specific people should have the access to the keys.
  - In production, there wouldn't be just one server running, there would be proper auth, more tight security checks. A lot of proxies that will have to be added.
      
- What parts of the spec were completed, how much time you spent, and any particular problems you ran into
  - I would say, a good chunk of the spec was completed. I spent about 2.5 hours.


- curls:
  - fetchOneOrder :   curl --location 'localhost:3000/fetchOneOrder?orderId=128'
  - createService :   curl --location 'localhost:3000/createService' \
                      --header 'Content-Type: application/json' \
                      --data '{
                          "name": "Home Inspection"
                      }'
  
  - deleteOrder  :    curl --location 'localhost:3000/deleteOrder' \
                      --header 'Content-Type: application/json' \
                      --data '{
                          "id":128
                      }'


  - createOrder  :    curl --location 'localhost:3000/createOrder' \
                      --header 'Content-Type: application/json' \
                      --data '{   "serviceId":124,
                          "totalfee":100088,
                          "services": [
                              {
                                  "id":124
                              }
                          ]
                      }'

  - updateOrder  :    curl --location 'localhost:3000/updateOrder' \
                      --header 'Content-Type: application/json' \
                      --data '{
                          "value": 12001,
                          "key": "totalfee",
                          "id": 132
                      }'


  - fetchAllOrders:   curl --location 'localhost:3000/fetchAllOrders'
