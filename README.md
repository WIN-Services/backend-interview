Requirements to run the project
1. Node JS
2. MongoDB
3. Nodemon

Steps to Run the project
1. Open Terminal
2. Cd in to the directory
3. npm i (to install all the dependencies)
4. nodemon app.js

Rest End Points(I have also created the postman collection with payload Example)
1. To Add the Order : http://localhost:3000/addOrder
    Payload Example: {
    "person":"rajat13",
    "fee":100,
    "service":[{
        "name":"Dame"
}]}
2. To List All the Orders: http://localhost:3000/orders
    Payload : No Payload needed
3. To Update the Order : http://localhost:3000/updateOrder
    Payload Example: {
    "person":"rajat13",
    "fee":201
    }
4. To Delete the Order with : http://localhost:3000/deleteOrder
    Payload Example: {
    "person":"rajat13"
}


