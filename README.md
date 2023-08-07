# WIN Backend Engineering Interview

## Scenario

Your mission is to build a portion of an order management system. You need to provide a service that allows other systems and teams to obtain information about orders.

## Tech stack

1. Node.js
2. Express.js
3. MongoDB
4. Mocha, Chai

### General

- Used **JavaScript**.
- You may use any framework, such as a web framework or test framework, to help you complete the project.
- You may store the data for this system in any database you choose, however we've included a Docker image loaded with Postgres in this repo.
- You may model the data any way you'd like, including adding data beyond the samples provided.

### Installation notes

- `git clone https://github.com/MadhuVaddi/order-service.git`
- `cd order-service`
- `npm install`
- `npm start` to run the server
- `npm run test` to run the test cases

## API calls

**Order APIs**

- `POST /orders`: This will check whether service with ID 123 is exists or not. If available then insert the order into DB else return error with Invalid service
  ```
  {
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "123",
        }
    ]
  }
  ```
- `GET /orders`: To get all the orders
  ```
   [{
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "123",
        }
    ]
  },.... ]
  ```
- `GET /orders/:id`: To get the order by order ID
  ```
  {
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "123",
        }
    ]
  }
  ```
- `PUT /orders/:id`: To update the order by order ID
  ```
  {
    "datetime": "2023-11-01T11:11:11.111Z",
    "totalfee": 101,
    "services": [
        {
        "id": "23",
        }
    ]
  }
  ```

- `DELETE /orders/:id`: To delete the order by order ID. If order exist, it will delete else returns error
  ```
  {
    message: "DELETE"
  }
  ```
**Service records APIs**
- `POST /servicerecords`: This will check whether same service name is exists or not. If not available then insert the service record into DB else return error with Service record already exists
  ```
  {
    "name": "Inspection"
  }
  ```
- `GET /servicerecords`: To get all the service records
  ```
   [{
    "name": "Inspection"
  },.... ]
  ```
- `GET /servicerecords/:id`: To get the service record by ID
  ```
  {
    "name": "Inspection"
  }
  ```
- `PUT /servicerecords/:id`: To update the service record by ID
  ```
  {
    "name": "Inspection New"
  }
  ```

- `DELETE /servicerecords/:id`: To delete the service record by ID. If order exist, it will delete else returns error
  ```
  {
    message: "DELETE"
  }
  ```

