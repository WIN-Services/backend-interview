To run server 
1.Create .env file and add mongodbURL variable.
2.Run npm install && npm start command.

To test
1.Run npm install -g newman command.
2.Go to tests folder and run "newman run win-backend.postman_collection.json -e win-backend.postman_environment.json" command.

Language and Framework Used:
    The solution is built using JavaScript and the Node.js runtime.
    The primary framework used is Express.js, a popular web application framework for Node.js.
    Mongoose, an Object Data Modeling (ODM) library for MongoDB, is used to interact with the database.


To build this web service for production, consider the following changes:

    Security:
        Use environment variables for sensitive information.
        Implement authentication, authorization, and input validation.
        Set up error handling and logging.

    Scalability:
        Containerize the application.
        Implement load balancing and caching.

    Testing:
        Establish automated testing and CI/CD pipelines.

    Backup and Disaster Recovery:
        Implement regular backups and disaster recovery plans.

    API Documentation:
        Create comprehensive API documentation.

    Security Audits:
        Conduct security audits and penetration testing.

