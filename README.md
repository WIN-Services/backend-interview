# Solution Description

- Took a modular and OOPS approach to developing the backend framwork. This allows for the code to be re-usable, scalable, efficient and easy to understand.
- Went with Express.js, PostGRESQL and Jest for testing due to familiarity, efficiency and suitability.
- Created a database model for all the orders and operations relevant to the orders.
- Created controller for operation on the orders table and another controller for error handling.
- Functions were routed through APIs cumilaatively presented in a routes file.
- The above methodology is best pracitce familiarised with previous experiences.
- Traded simplicity for understnadability and efficiency in management of code. Otherwise can be written in a very straightforward and simplistic manner.
- For production would increase the test cases and further modularise functionality. Would use a more secure approach to using db credentials using external tools.
- All parts of the assignment completed

# Setup Instructions

1. Clone repo

```
cd express-postgresql-jest
```

2. Initialize a new Node.js project using npm init command:

```
npm init
```

3. Install the necessary dependencies for your project:

```
npm install express pg jest supertest
```

4. To run project:

```
node server.js
```

5. To run test:

```
npm test
```
