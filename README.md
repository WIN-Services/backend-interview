
Submission By Shivangi Garambha

- A description of your solution at a high-level, including language used, framework used, roughly how it works, etc.
    - There are 2 main entities. Service and Order. Service has field 'name'. Order has field 'totalFee' along with services. One Order can have many services attached to it. You can do following operations on services and orders: Create, Update, GetAll, GetById and Delete.
    - I have used nodeJs with expressJs framework to create APIs. Have used Postgresql as a database to manage the data of orders and services.
    - Below are the endpoints with short description
      - POST: /order - To create new order
      - PUT: /order/:orderId - To update order (You will not able to update the order which is created less than 3 hours ago)
      - GET: /order - To get all orders
      - GET: /order/:orderId - To get order by Id
      - DELETE: /order/:orderId - To delere order by id

- What trade-offs you made
    - As a database I have chosen relational database(Postgresql) as the order and service has fix schema and their relationship can be more managable with it.
    Alos i have added users/admin limitation to API's access.
    Added authentication etc.

- What you would change if you built this for production
    - For production, I need to encrypt sensitive data such as DB configurations.
    - I also need to change env configurations. I will create separate env files for different environments.
    - Currently i havent taken services in consideration and only managed to create order api's
    - Filteration and pagination can be added.

- Brief instructions on how to setup the environment to run your project
    - Here are the steps to setup the project
      1. Run 'npm install'
      2. Create '.env' file and make chnages in knexfile.js as per your db configurations.
      3. Run command -> knex migrate:latest
      4. Run 'node server.js'
   

- What parts of the spec were completed, how much time you spent, and any particular problems you ran into
  - I have included almost all the requirements mentioned. It took 4 hours to implement all features of order API's excluding the testing suite.