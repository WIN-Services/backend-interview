## High-level soution description
      - The order and service-records have their own module for separation of concerns.
      Each service file deals with their own CRUD operation. We check the last order datetime and then only decide whether to insert/update the incoming order.   
## Language used
      - Typescript

## Framework used
      - NestJS

## Database used
      - PostgreSQL(npm package: pg)

## How it works:
      - The requirement logic for inserting or updating an order is in the db function, so first we run a query to check whether the date time that we had stored for the last order and the income order datetime is greater than or equal to 3. If it exceeds 3 hours we insert/update the order.

## Instructions on how to setup the environment to run your project
      - All the required sql scripts are included in the directory sql-scripts, execute it in any postgresql database and would create all the tables and functions.
      - Open the directory in the terminal
      - Run the following commands
        - npm i
        - npm run start:dev

## Changes for production
      - Maintain two different env files, one for production and one for development(production.env & development.env)
      - The envFilePath, which we configure in app.module.ts for the ConfigModule class import needs to know which env file to choose from.
      - So we modify our scripts to start the application in our package.json and mention which script to run for which environment,e.g., to run the production server, we will modify the script like so:
        "start:prod": "NODE_ENV=production node dist/main" 
      Now ConfigModule will know which env file to pick from.
        
  ## Tradeoffs
      - Using NestJS for abstraction may result in a slight decrease in performance when compared to writing code directly with Node.js.
      - The npm package pg provides precise control and excellent performance, although it necessitates the creation of manual SQL queries and managing data mapping.
      - I have used the free tier of elephantsql for this assignment. There might be a timeout issue sometimes while connecting to the database.


## Assumptions
      - I assumed that everytime I will have to compare the incoming datetime with last order date time by running a query that would filter the last order date time. But if I store the last order date time somewhere then that would be more optimal.

## Specs
      - The controller spec for the order has been completed, it tookme around 20 minutes and I didnt have any significantly major issue.
