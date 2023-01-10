
###### POSTMAN COLLECTION IS INCLUDED IN THE REPO. ######

### requirement to run this project
1. Node.js
2. postgreSQL

all other necesaary packages like express.js and required OEM will be installed via package.json

### steps to run this project
1. open integrated terminal in root directory of project.
2. npm i
3. CREATE a pg database.
4. fill .env with required pg database creds
5. npm start

### A description of your solution at a high-level:-
the project is pretty straight forward. it includes crud operations for services and orders.
while updating or creating and order, we check for existing orders created in past three hours. if found, we restrict the creation or updations.
All controllers and models extend a base class containing the common crud logic to prevent repetitive code.

### language used, framework used
node.js, postgresql, express.js
ORM - bookshelf
query builder - knex.js

### assumptions made that affected the solution 
a order can be associated with multiple services. 
every service has a different fee.
totalFee of a order will be the total of those services.

### What would change i if i built this for production
will add a jwt based authentication for users and allow user-scoped orders.
