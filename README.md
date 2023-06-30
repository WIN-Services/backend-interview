# WIN Backend Engineering Interview

## Api curls
  order creation
 ```json
  curl --location --request GET 'localhost:80/service/panel/orderService/v1.0/orders/getOrders/orderId/649df4a4a722947272faec73' \
  --header 'authority: api.boltic.io' \
  --header 'accept: application/json, text/plain, */*' \
  --header 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
  --header 'content-type: application/json' \
  --header 'sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"' \
  --header 'sec-ch-ua-mobile: ?0' \
  --header 'sec-ch-ua-platform: "macOS"' \
  --header 'sec-fetch-dest: empty' \
  --header 'sec-fetch-mode: cors' \
  --header 'sec-fetch-site: same-site' \
  --header 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' \
  --header 'x-tenant-id: gmailcom' \
  --header 'x-user-id: souravlhurana@gofynd.com' \
  --header 'Cookie: bg.session=s%3AjaB2-C8LYea0XrL-FVX5KmirVR6axAP9.20LpuEkrfJj7%2B%2BroUgwGGAlzIV0DwwZtMPyO2l%2F4t8M' \
  --data-raw '{
          
          "services":["inspection"],
          "user":5,
          "amount":500

  }'
 ```

 order updation 
 ```json
    curl --location --request DELETE 'localhost:80/service/panel/orderService/v1.0/orders/deleteOrder/orderId/649df4050534bc471edc84e0' \
    --header 'authority: api.boltic.io' \
    --header 'accept: application/json, text/plain, */*' \
    --header 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
    --header 'content-type: application/json' \
    --header 'sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"' \
    --header 'sec-ch-ua-mobile: ?0' \
    --header 'sec-ch-ua-platform: "macOS"' \
    --header 'sec-fetch-dest: empty' \
    --header 'sec-fetch-mode: cors' \
    --header 'sec-fetch-site: same-site' \
    --header 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' \
    --header 'x-tenant-id: gmailcom' \
    --header 'x-user-id: souravlhurana@gofynd.com' \
    --header 'Cookie: bg.session=s%3AjaB2-C8LYea0XrL-FVX5KmirVR6axAP9.20LpuEkrfJj7%2B%2BroUgwGGAlzIV0DwwZtMPyO2l%2F4t8M' \
    --data-raw '{
            
            "services":["inspection"],
            "user":5,
            "amount":500
    }`
 ```

 order deletion
 ```json
    curl --location --request PUT 'localhost:80/service/panel/orderService/v1.0/orders/updateOrder/649df4050534bc471edc84e0' \
    --header 'authority: api.boltic.io' \
    --header 'accept: application/json, text/plain, */*' \
    --header 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
    --header 'content-type: application/json' \
    --header 'sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"' \
    --header 'sec-ch-ua-mobile: ?0' \
    --header 'sec-ch-ua-platform: "macOS"' \
    --header 'sec-fetch-dest: empty' \
    --header 'sec-fetch-mode: cors' \
    --header 'sec-fetch-site: same-site' \
    --header 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' \
    --header 'x-tenant-id: gmailcom' \
    --header 'x-user-id: souravlhurana@gofynd.com' \
    --header 'Cookie: bg.session=s%3AjaB2-C8LYea0XrL-FVX5KmirVR6axAP9.20LpuEkrfJj7%2B%2BroUgwGGAlzIV0DwwZtMPyO2l%2F4t8M' \
    --data-raw '{
            
            "services":["inspection"],
            "user":5,
            "amount":500

    }'
 ```
 getorders 
 ```json
      curl --location --request POST 'localhost:80/service/panel/orderService/v1.0/orders/createOrder' \
      --header 'authority: api.boltic.io' \
      --header 'accept: application/json, text/plain, */*' \
      --header 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
      --header 'content-type: application/json' \
      --header 'sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"' \
      --header 'sec-ch-ua-mobile: ?0' \
      --header 'sec-ch-ua-platform: "macOS"' \
      --header 'sec-fetch-dest: empty' \
      --header 'sec-fetch-mode: cors' \
      --header 'sec-fetch-site: same-site' \
      --header 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' \
      --header 'x-tenant-id: gmailcom' \
      --header 'x-user-id: souravlhurana@gofynd.com' \
      --header 'Cookie: bg.session=s%3AjaB2-C8LYea0XrL-FVX5KmirVR6axAP9.20LpuEkrfJj7%2B%2BroUgwGGAlzIV0DwwZtMPyO2l%2F4t8M' \
      --data-raw '{
              
              "services":["inspection"],
              "user":5,
              "amount":500
      '
 ```



## chnages for production
  1. Authentication 
  2. Rate limiting
  3. Sharding of databases 
  4. Validations on schema
  5. caching like redis or memcache
  6. APis for services object handling 
  7. Admin panel

  

## Instructions to run project locally 
  1. install node 
  2. clone the repo
  3. run npm i
  4. install mongodb locally using docker image
  5. run command -> npm run start
  6. install postman to play with apis.

## Completion
  All parts are completed 
  
  Time Taken 
  1. Setting up repo structure for modular design - 2hrs
  2. Writing apis  - 6 hrs
  3. Setting up test env - 2 hrs
  
  Problems encountered 
    1. Setting up postgres locally used mongo instead
## Scenario

Your mission is to build a portion of an order management system. You need to provide a service that allows other systems and teams to obtain information about orders.

## Deliverables

There are two deliverables for this project:

1. An internal web service API for managing orders
2. A test suite to validate the web service and library work as expected

### General

- Please use either **JavaScript/TypeScript or Python**.
- You may use any framework, such as a web framework or test framework, to help you complete the project.
- You may store the data for this system in any database you choose, however we've included a Docker image loaded with Postgres in this repo.
- You may model the data any way you'd like, including adding data beyond the samples provided.

### Web Service

- Your service should implement several endpoints that accept POST, GET, PUT and DELETE requests. Also 1 endpoint that accepts GET all orders.
- Your service should handle edge cases appropriately and return appropriate HTTP status codes.
- Your service should return an error on creation/updating an order within 3 hrs of a pre-existing order.
- Your service should return JSON results.
- Your service should have at least one test.


## Duration

Up to 2 hours.

## Submission
1.  Clone this repo
2.  Create Web Services and tests
3.  Submit a Pull Request (PR)
4.  In the PR, include a README that includes the following:
      - A description of your solution at a high-level, including language used, framework used, roughly how it works, etc.
      - What trade-offs you made
      - Any assumptions you made that affected your solution
      - What you would change if you built this for production
      - Brief instructions on how to setup the environment to run your project
      - What parts of the spec were completed, how much time you spent, and any particular problems you ran into

## Evaluation
We are looking for: 
1. Communication
2. Solution Design
3. Completeness
4. Code clarity / readability

