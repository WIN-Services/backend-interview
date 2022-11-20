# WIN Backend Engineering Interview

<ul>
  <li><a href='https://nodejs.org/en/'>Node.js</a>: backend framework;</li>
  <li><a href='https://expressjs.com/'>Express.js</a>: http server and routing;</li>
  <li><a href='https://sequelize.org/master/'>sequelize.js</a>: database ORM;</li>
</ul>


# Getting started

to start working with the project just :

```sh
# install the dependancies
npm install
#Create your .env file // refer the the evironment variables block
#start the dev server
npm run dev
```

# Environment variables

The application expects to find a .env file containing the following variables:

```sh
# The http server port
PORT=3000
# the name of the project database in the mysql server you are using
CREATE DATABASE orderdb;

#Create User
CREATE USER 'orderdev'@'%' IDENTIFIED BY 'order1234';

#Grant access to user
GRANT ALL PRIVILEGES ON `orderdb`.* to 'orderdev'@'%';

BASE_PATH=/api/v1
```

# Architecture

The architecture is made while respecting the solid and clean architecture principales to ensure maximum independancy between the app components.

### Folders:

-   **models _(dir)_ :** contains the models for the application Objects(databse models/tables) with all the business logic required. each model have it own file and is made independant from the chosen ORM. _(this is the quivalent of the model in the mvc controller)_

-   **controllers _(dir)_ :** contains the controllers for each model and is independant from the router and the model. if the controller doesn't need any special logic consider using the controller builder in the helpers/utils.js _(this is the quivalent of the controller in the mvc controller)_

-   **services _(dir)_ :** contains functions that can be used by the controllers .

-   **routes _(dir)_ :** Contains the routes for each model/controller and are made independent from the routing framework

-   **helpers _(dir)_ :** Contains utilities.

-   **database _(dir)_ :** Contains all the elements for intiating the ORM

### Files:

-   **server _(file)_ :** Configures, initiates the express application and start the server



## List of endpoints to test
- **Get all orders :** api/v1/order - GET (uses pageIndex and pageSize as query params for pagination)
- **Create a new order :** api/v1/order - POST
- **Get order by ID :** api/v1/order/:orderID - GET
- **Delete an Order :** api/v1/order - Delete
- **Update an order :** api/v1/order - Put

## How to populate the data
- Uncomment the modelseeders in /database/index.js to populate existing data to db
