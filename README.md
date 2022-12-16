
# Order management

Order management system service which is meant to provide a public url for the other systems to have the required data around the orders.

## Setup Requirement

We require below services/software on system for project setup.
* Node v16.x
* NPM 6.x and above
* PM2 4.x and above
* Typescript compiler
* GIT

## Setup Guide

* Install packages and dependencies

  ```
  $ npm install
  ```

* Create `.env` file  in server directory with following set of commands and configure according to environment. You can set the value `NODE_CONFIG_ENV` to production or development as well.

  ```
  $ touch .env
    echo '
        PORT=3008
        DB_HOST = localhost
        DB_PORT = 5432
        DB_USER = root
        DB_PASSWORD = root
        DB_NAME = order_management
    ' > .env
  ```

* If you wish to only create the build otherwise skip this step.

  ```
  $ tsc
  ```

* Start application-

  ```
  $ npm start
  ```



Currently docker environment is not working beacuse of the tables which aren;t getting created in the database while runnin the docker container.