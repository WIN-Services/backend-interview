This project has been made using node.js as backend service and sqlite as database 

Assumptions:

1. I assumed that there can be many orders with same id.



This project has been made with the below functionalities:

1. on get request, all the data will be fetcted from orders table.

2. on passing the id in the get api, all the data with same id will be provided

3. on post request data will be inserted to the database
    a.if data is inserted with same id within 3 hours then data cannot be inserted
    b.if services array of order request contains id not present in service table,
      then data will not be inserted

4. on put request, data will be updated
  a. if the id not present data will not be updated 

5. while deleting, updating, inserting any data, it will check for the latest row when it was added



For production :

1. I will created DB that will be created and tables will be added automatically
2. More robust
3. unwanted formatting for data will be added to handle them
4. I will increase my code readablity

Below data has been added to OMS.db explicityly and it's assumed that it's alread there


To set up the environment use: 
node server.js

to test test suite:
npm run test

postman collection has been provided to do more tests


Database containing the below data in services table:

[
  {
    "id": 123,
    "name": "Inspection"
  },
  {
    "id": 789,
    "name": "Testing"
  },
  {
    "id": 456,
    "name": "Analysis"
  }
]

Below data has been inserted in the orders table


[
  {
    "id": "223",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "123",
        }
    ]
  },
  {
    "id": "224",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "789",
        }
    ]
  },
  {
    "id": "225",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "456",
        }
    ]
  }
]
```

requests:
1. get - http://localhost:5000/api/v1/orders
2. get id - http://localhost:5000/api/v1/orders/223
3.delete - http://localhost:5000/api/v1/orders/225
4.put - http://localhost:5000/api/v1/orders
    {
        "id": 223,
        "dateTime": "22222",
        "totalfee": "9001",
        "services": [
            {
                "id": 456
            },{
                "id": 789
            },{
                "id": 123
            },{
                "id":789
            }
        ]
    }

5. post - http://localhost:5000/api/v1/orders
    {
    "id":225,
     "dateTime":"2022-12-22T06:02:52.872Z",
     "totalfee":900,
     "services": [{"id":456}]
}

