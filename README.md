1. build the docker image for node app. (assuming you have docker installed) using docker ```docker build -t node:latest .```
2. up the container with postgreSQL 
```
docker-compose up
```
3. you can find sample request inside the sample.http
4. first you will have to create service records only then you will be able to create orders.
5. totalFee is accepted in the request body with the order.
Can be done when creating service record and associate the price with every service record
but for minimal solution went ahead with this.

you can also run tests
just replace the command in the ```docker-compose.yml```
with ```npm install && npm run start``` -> ```npm install && npm run test```




