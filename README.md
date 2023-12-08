# WIN Backend Engineering Interview

## Scenario

Your mission is to build a portion of an order management system. You need to provide a service that allows other systems and teams to obtain information about orders.

I have added Routes for both Services and Orders which Is a little extension over existing task along with that I have made few assumptions over that each service should be having a price associated with it which we can autocalculate at the time of creation of the Order 

Tech Stack --- NestJS, Postgres, Docker, TypeScript.

GET,POST,PATCH,DELETE for services goes like -- /service-product
GET,POST,PATCH,DELETE for orders goes like -- /orders

for Setup simply have Docker Installed and run
> docker compose up -d

you should have your apis ready on localhost:3000

I have completed all the parts of the spec which took little over 2H and problems which I majorly ran into was setup of network for docker and postgres for Nest service

For Production I can add better validations, logging and error handling.
