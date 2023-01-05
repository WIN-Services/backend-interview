# WIN Backend Engineering Interview

# Language Used - Javascript
# Framework Used - Express
# Runtime - NodeJs
# Database - MongoDB

# setup the environment to run your project

- clone the repo
- run "npm i" to install packages
- run "npm start" to start server

# Solution
- created schema using mongodb with relevant fields
- Used environment variables to store the database link with password and port
- Used find, findOne, findById, etc to manipulate and access the document stored in the database
- used HTTP method GET, POST, PUT, Delete 
- used async and await for non-blocking code
- used proper response code for Result

# URL FOR REQUEST

- Get all orders - http://localhost:3000/orders (With HTTP Method Set to GET)
- Get particular order - http://localhost:3000/orders/63b6f1b6326c50ca68106bf9 (With HTTP Method Set to GET)
- Update Order - http://localhost:3000/orders/63b6f1b6326c50ca68106bf9 (With HTTP Method Set to PUT)
- Delete Order - http://localhost:3000/orders/63b6f1b6326c50ca68106bf9 (With HTTP Method Set to DELETE)
- create a Order - http://localhost:3000/orders (With HTTP Method Set to POST)

# PostMan Sample - 
 "status": "Success",
    "data": {
        "orders": [
            {
                "_id": "63b6eb4cf21bc6ff96352f07",
                "customer": "Aman",
                "item": "Veg burger",
                "quantity": 4,
                "fulfillmentStatus": "pending",
                "OrderedAt": "2023-01-05T15:22:11.323Z",
                "UpdatedAt": "2023-01-05T15:22:11.323Z",
                "__v": 0
            },
            {
                "_id": "63b6eb8ff21bc6ff96352f09",
                "customer": "Abhishek",
                "item": "Veg maggie",
                "quantity": 1,
                "fulfillmentStatus": "pending",
                "OrderedAt": "2023-01-05T15:22:11.323Z",
                "UpdatedAt": "2023-01-05T15:49:24.863Z",
                "__v": 0
            },
            {
                "_id": "63b6f1b6326c50ca68106bf9",
                "customer": "Utkarsh",
                "item": "Veg pizza",
                "quantity": 4,
                "fulfillmentStatus": "pending",
                "OrderedAt": "2023-01-05T15:49:20.256Z",
                "UpdatedAt": "2023-01-05T15:49:20.256Z",
                "__v": 0
            }
        ]
    }
}

# What I will change if i built this for production
- add more filters to get the specific detail of order
- use middlewares
- sanitize the data
