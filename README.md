# WIN Backend Engineer Interview

## Scenario

The requirement was to build a portion of an order management system. Providing a service that allows other systems and teams to obtain information about orders.

## Deliverables

There were two deliverables for this project:

1. An internal web service API for managing orders
2. A test suite to validate the web service and library work as expected

## Approach

- Used NodeJs and Express.js to build this system.
- Since there was a docker image of postgreSQL defined, used the same dataase for storing and retrieving data. 
- Created two controllers: One for controlling the functionalities of APIs and the other for controlling the functionalities of the database.
- All the API routings are present in the Routes folder.
- All the authentication and validation part is present in the middleware folder.
- Also included JWT token authentication for API authentications.
- Divided the server.js into 2 parts:
1. app.js - containing the app part
2. server.js - containing the server part
This was a necessary part for testing. As we wanted to just use the app for testing.
- All parts of the assignment completed

## Setting Up

1. Clone repo
2. Initialize a new Node.js project using npm init command:
    ```
    npm init
    ```

3. Install the necessary dependencies for your project:
    ```
    npm install
    ```

4. To run project:
    ```
    npm run dev
    ```

5. To run test:
    ```
    npx jest tests/orders.test.js
    ```


## Changes required to make it production ready.

1. There is no authentication or authorization necessary for the APIs. Although I have included it in my project, it isn't complete. A production ready system should have JWT token, an expiry time associated with that token and also a refresh token.
2. Since our current system is small, a single server can serve our needs but a production system would need to utilize all the cpu resources. One way of acheiving that is the use of clusters and workers. Below is a sample code for how it can be achieved : 
    ```
        let cpus = os.cpus();
        for (let i = 0; i < cpus.length; i++) {
            console.log(`master is running on `, process.pid);
            cluster.fork();
        }
        cluster.on('exit', () => {
            console.log('Worker died');
            cluster.fork();
        });
    ```
3. Currently all the reads and writes are being done directly to the DB. This can be costly in a production environment. A way to optimize this is to use redis for caching.
We can cache JWT tokens too for faster authentication. The condition of restricting creation/updation of orders within 3 hrs can be handled efficiently using caching.
4. The env file was included in the git repository but it is something that should not be done in a production ready environment because it will expose the credentials that were meant to be hidden.
5. Currently our number of orders are very less so we our able to process them without a problem but in a production ready environment, it will difficult to manage thousands of orders in a second. To manage this efficiently, a message queue such as RabbitMQ should be used. This message queue ensures that all the orders are processed, no order is missed and that our Database is not flooded with reqeuests.