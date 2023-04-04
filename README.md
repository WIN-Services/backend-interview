# WIN Backend Engineering Interview Assignment

# API PROJECT
In this project, I created apis for  a portion of order management system. It has several endpoints like for creating a new Order , getting order by ID , getting all the orders , deleting an order and updating an existing order which other systems and teams can use.

# Getting Started
## Installation steps

We will first install a few dependencies:
```
npm i express mongoose nodemon dotenv
```
Here,

1.Express will be used for the middleware to create various CRUD endpoints.

2.Mongoose for managing data in MongoDB using various queries.

3.Nodemon to restart our server every time we save our file.

4.Dotenv to manage a .env file.

---
## Basic Setup
After they have finished installing, create one file named server.js. This will be the entry point for our application.

And in this file, let's add Express and Mongoose, and run the file.

```
const express = require('express');
const mongoose = require('mongoose');
```

Now, transfer the contents of Express into a new constant called app.

```
const express = require('express');
const mongoose = require('mongoose');

const app = express();
```
Now, let's listen the changes of this file on port 80.
```
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.listen(80, () => {
    console.log(`Server Started at ${80}`)
})
```
## Connect mongodb in our application

After copying the string from MongoDb compass,

We will add our username and password to this string.
The final connecting string will look something like this:
```
'mongodb+srv://tusharagrawal2706:******@cluster0.bcfzcjv.mongodb.net/test_db'
```
Here, tusharagrawal2706 is the username, followed by the password, and last is the database name.

So, paste this string into the .env file.
```
DATABASE_URL = 
'mongodb+srv://tusharagrawal2706:******@cluster0.bcfzcjv.mongodb.net/test_db'
```

Now, let's import the contents of our .env file in the script file, server.js.
```
require('dotenv').config();


const mongoString = process.env.DATABASE_URL
```
Here, we are storing the string into a variable called mongoString.

Now, let's connect the database to our server using Mongoose.
```
mongoose.connect(mongoString);
const database = mongoose.connection
```
Now, we have to throw a success or an error message depending on whether our database connection is successful or fails.
```
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
```
Here, database.on means it will connect to the database, and throws any error if the connection fails. And database.once means it will run only one time. If it is successful, it will show a message that says Database Connected.

---

## Create our Routes for the Endpoints
Create a folder called routes, and inside make a file called route.js.

Import this file into our main script file, server.js.
```
const routes = require('./routes/route');
```
Also, let's use this routes file.
```
const routes = require('./routes/route');

app.use('/api', routes)
```
Here, this app.use takes two things. One is the base endpoint, and the other is the contents of the routes. Now, all our endpoints will start from '/api'.

We will get an error because we don't have anything inside the routes file. So, let's add them.
```
const express = require('express');

const router = express.Router()

module.exports = router;
```

# Working Of the project

The project works in a very simple way:

1.  We first create new orders using postman by sending json objects in a document.

2. We can then send either of GET,PUT,POST,DELETE request in postman to handle the order data in db

#### Language used : JS

#### Frameworks used : Express.js , Jest

#### DB used : MongoDB

---


## Here are the requirements that have been successfully implemented as per the project's specifications:

#### 1. I have created all the Services mentioned in the assignments.

#### 2. No trafe-offs were made. Only felt that I could have added more number of tests but had to stick to less number of tests due to time constraint.

#### 3. I made one assumption regarding services field in the model that it will store all the services ids required for that particular order in an array.

#### 4. Doing so with the services field made me realize that in order to make this code production ready, we can calculate the cost of each service id listed in the array. The cost can be calculated from services model which could contain service id, service name and cost of that service. By adding cost of all services we could have directly updated the total fees field in the orders model from the backend.

#### 5. I spent around 4-5 hours doing this assignment because I worked on jest around 2 years ago and didn't remember about it a lot. So had to reasearch how to test the API's through jest and applied the same in this assignment. The time validation check and working with jest was interesting and fun at the same time. 

#### 6. In conclusion, I would like to say that I enjoyed doing this assignment and it helped me expand my knowledge further.
