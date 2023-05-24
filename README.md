# WIN Backend Engineering Assignment

## Tech Stack Used
Node js, mongodb

## Database Schemas
- 2 schema are there 1st to store order and 2nd to store service records
- I have provided the reference of serviceRecord collection in orderId(so in POST request We only have to send the unique services nameArray like ("Inspection","Testing") to store serviceRecord Ids)

### APIs

- Get all order API **GET - /orders** to fetch all the orders in db
- Get order by Id API **GET - /order/:id** to fetch single order by its id
- create order API **POST - /order** this req containg following json 
```json
{
    "id":123,
    "totalfee": 81,
    "services": ["Inspection", "Testing]
} 
```
to add order in db and these services will get fetched from db and then it store the reference of these record ids in db
- Update order API **PUT - /order/:id** to update single order by its id
- Delete order API **DELETE - /order/:id** to delete single order by its id

## To RUN
- cmd-> npm start
Note- Before starting add some default data in **Record** collection(for this collection I am using mongodb default ids)
```json
[
  {
    "name": "Inspection"
  },
  {
    "name": "Testing"
  },
  {
    "name": "Analysis"
  }
]
```

## To Test
cmd-> npm test
