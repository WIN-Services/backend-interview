# WIN Backend Engineering Interview

### Requirements to run the project
1. Node JS
2. MongoDB
3. Express Js

### Steps to Run the project
1. Open Terminal
2. Cd in to the directory
3. npm i (to install all the dependencies)
4. npm start / ( node index.js )

Rest End Points(I have also created the postman collection with testing)
1. To Add the Order : http://localhost:8000/order/create

  ......require to send element in body  ( totalFee : , serviceId : )
   
2. To List All the Orders: http://localhost:8000/order/all
   ...... no require any element
    
3. To Update the Order : http://localhost:8000/order/update/:id

  .......require to send orderId to update and pass value in body of ( totalFee : )
  
4. To Delete the Order with : http://localhost:8000/order/delete/:id
    ......require to send orderId to delete
    
5. To Get the Order with id : http://localhost:8000/order/:id
    .......require to send orderId to fetch particular id
    
    
### All operation with service is similar to order please follow above steps

