# Running the Server
1. Create a `.env` file and add the `mongodbURL` variable.
2. Run the following commands:
   - `npm install`: Install project dependencies.
   - `npm start`: Start the server.

# Testing the Server
1. Install Newman globally using `npm install -g newman`.
2. Go to the `tests` folder.
3. Run the following command to execute API tests: `newman run win-backend.postman_collection.json -e win-backend.postman_environment.json`

## Language and Framework Used
- The solution is built using JavaScript and the Node.js runtime.
- The primary framework used is Express.js, a popular web application framework for Node.js.
- Mongoose, an Object Data Modeling (ODM) library for MongoDB, is used to interact with the database.

## Preparing for Production
### Security
- Use environment variables for sensitive information.
- Implement authentication, authorization, and input validation.
- Set up error handling and logging.

### Scalability
- Containerize the application.
- Implement load balancing and caching.

### Testing
- Establish automated testing and CI/CD pipelines.

### Backup and Disaster Recovery
- Implement regular backups and disaster recovery plans.

### API Documentation
- Create comprehensive API documentation.

### Security Audits
- Conduct security audits and penetration testing.

