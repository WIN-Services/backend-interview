# WIN Backend Engineering Interview

## Description

This project involves an order management system featuring an internal web service API for order management. It is developed using Node.js, Typescript, and Express, utilizing MySQL as the database and Prisma as the ORM.

## How it works?

The entire application is housed inside the `src` folder, consisting of subfolders such as controllers, routes, services, schemas, validations, and tests. The code begins with `index.ts` inside the `src` folder, leading to the root router. From there, it identifies the specific route to which the request must go. Afterward, it proceeds to the controller through the route where the exact logic is written for the intended operation. Validations are performed here, and a service method is called, interacting with the database to produce the desired output, which is then returned from the controller.

## Assumptions

I assumed that there will always be three services present in the database. Although more services can be created, I assumed that three would be present by default.

## Changes for Production

The following changes will be made for production:

- Write better tests
- Implement a more robust way of handling errors
- Incorporate authentication
- Introduce pagination (if the number of orders becomes too high)
- Utilize optimization techniques such as indexing in the database, caching, etc.

## How to set up

- Clone the repository
- Run `npm install`
- Copy `.env.example` to `.env`
- Paste the `PORT` value and `DATABASE URL`
- Run the server with the command: `npm run start`
- Test the API using Postman
- To run tests, use the command: `npm run test`

## Completed Tasks

- &#9745; Implement several endpoints that accept POST, GET, PUT, and DELETE requests.
- &#9745; Handle edge cases appropriately and return appropriate HTTP status codes.
- &#9745; Return an error on the creation/updating of an order within 3 hours of a pre-existing order.
- &#9745; Return results in JSON format.
- &#9745; Include at least one test.

## Time spent

Around 3 to 4 hours.

## Problems Encountered

No issues.
