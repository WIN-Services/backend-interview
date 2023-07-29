- A description of your solution at a high-level, including language used, framework used, roughly how it works, etc.
          - I have taken a very simple approach for this problem where I am creating a 4 new endpoints using node.js, express.js. 
             a. I am rather inserting name of services in the table orders, I have created two table which will customerOrders, customerServices.
                 CustomerOrders will hold all the data related to orders and its the main table we are interacting with only. 
                 CustomerServices will hold all the services which we are providing such as cleaning, washing and sweeping.
             b. In create order api, I am inserting new record with fee and service name
             c. In Update order api, I am updaing fee and service         
  - What trade-offs you made
        I have made two table rather than 1 table in this problem for better understanding and reuseability of code and tables. 
        Also used sequalize ORM for database connection and queries.
  - Any assumptions you made that affected your solution
        No
  - What you would change if you built this for production
        use this solution have all the requirements which we could need for the front-end applications.
  - Brief instructions on how to setup the environment to run your project
        sudo apt install node
        sudo apt install postgresql
        cd backend-interview
        npm install
        Run: npm start
        Test: npm test
  - What parts of the spec were completed, how much time you spent, and any particular problems you ran into
        I have taken around 2 to 2.5 hours for this project. 
        I have not worked much on sequleize earlier. So, Learning that took a little bit of time. 