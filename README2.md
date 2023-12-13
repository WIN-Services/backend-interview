## Project Title
Order Management System

## Overview
This project was implemented using Node.js and the Express framework. Its core functionality involves managing orders, including adding new orders from a list of existing services, deleting, updating, and retrieving all orders. Additionally, the system provides APIs for adding new services and retrieving all services. MongoDB is used for storing the data.

## Trade-offs
In the development of this project, several trade-offs were considered:
1. Scalability: The current implementation may have limitations in handling large datasets. Scalability improvements could be explored for production use.
2. Dependency Choice: Certain dependencies were chosen based on ease of use and familiarity.
3. Security: Secrets were hardcoded in the environment file instead of being securely stored in a cloud environment.

## Changes for Production
If this project were to be deployed in a production environment, the following changes would be considered:
1. Security Enhancements: Strengthen security measures, especially around sensitive data handling.
2. Implement Logging Mechanisms: Enhance logging capabilities for better monitoring and debugging.
3. Optimizations: Conduct performance optimizations for improved responsiveness.
4. End-to-End Load Testing: Perform comprehensive load testing to ensure the system's stability under different levels of traffic.
5. Secrets Management: Move secrets from the environment file to a secure cloud environment for improved security.

## Project Setup
To set up the project:
1. Navigate to the root folder: cd backend-interview.
2. Install packages: npm i.
3. Configure the environment files: Add the necessary environment variables in the root folder.
4. Run: node server.js.
5. Use the provided bearer token in the authentication header.
( eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNBUkFUSCIsImlhdCI6MTAxNjIzOTAyMn0.dfGm7vmwbi-n30QSWRI_vINMadIrOJLmHSbJPlWTF5w )



##  API DOC ##
# POST ORDERS
API: http://localhost:3000/api/addOrder
{
    "services":[
        {
            "id":"c8321"
        }
    ]
}

# GET ORDERS
API: http://localhost:3000/api/order/{orderID}


# DELETE ORDERS
API: http://localhost:3000/api/order/{orderID}


# GET ALL ORDERS
API: http://localhost:3000/api/orders

# UPDATE ORDERS
API: http://localhost:3000/api/order/{orderID}
{
    "services":[
        {
            "id":"c8321"
        }
    ]
}

# ADD SERVICE
API: http://localhost:3000/api/addService
{
    "name":"Health care",
    "fees":"200"
}

# GET ALL SERVICE
API: http://localhost:3000/api/services



## Development: 3 hours
1. Implementing Order Management features
2. Adding Service Management functionality
3. Integrating with MongoDB
4. Testing & debugging the application

## Documentation: 1/2 hours
1. Writing the README file
2. Documenting features and trade-offs
3. Preparing deployment instructions





