Technology Used : Nodejs
Framework : Express
Database : MongoDB
ODM used : Mongoose

Change the mongo uri String in Env file variable name "MONGO_URI"
pass port number in env file in variable "PORT" on which port you want to start the backend server
Need to change the environment in env file the mode of environment on variable "NODE_ENV"

To Run the Project :
1.)  Clone the project
2.)  Run command "npm install" in root directory to install dependancy
3.)  Pass the all environment variables values in env file
4.)  Start project server by command "node server.js"

Project structure :
In app directory we have folder modules inside this,
1.) Controller : whole api function are there to implement the logic of specific api
2.) Models : Database schemas are defined here
3.) Routes : Project routing files are here

error handling middleware are in the middleware directory and helper directory