# WIN Backend Engineering Interview

## Installation process
1. Start Postgres server and create a database "oms"
2. Run npm install
3. Run npm run prisma:migrate:deploy
4. Run npm run prisma:generate
4. Run npm run prisma:seed
5. Run npm run build
6. Run npm run start

## Technologies used

### Nodejs/Express
- Node Js is a javascript runtime coupled with ExpressJs framework it allows and helps in creating higly scalable servers easily.

### Postgres DB
- Postgres is a RDBMS this will act as database for the application.

### Prisma
- Prisma is an ORM which can be used for multiple SQLs and NoSQLs. Here it's used for database management.

### TypeScript
- Typescript is strongly typed programming language build over javascript. Here it's used to provide typechecks.

### Docker
- Docker is only used for postgres here.

## Solution
1. The solution is a very simple Express Js server
2. Provides CRUD operations over a specific table design
3. A high level API documentation can be found on https://documenter.getpostman.com/view/11574963/2s93RMVFmh
4. Provides scope for version controle for APIs created
5. Routes and Controller segregation allows for highly scalable application if needed

## Assumptions
1. Postgres SQL is used
2. SQL running on 5432 Port
3. SQL user pass are postgres

## Chnages for production
1. Will implement microservice architecture
2. Seperate server for each route
3. Better DB management
4. Seperate file for any constants needed in the code
5. Add Logger to the server
6. Better and stricter test cases
7. Strict typescripting
8. Add request verification and user verification using JWT