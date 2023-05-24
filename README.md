## Code Flow

1. I have used ```MongoDB``` as the database, ```Express``` framework for server, and ```Jest``` for testing.   
2. I have used the central object to pass on my dependencies and not initialising them multiple times.   
3. In My CRUD Application, for the:   
   
  a. **Create order**:   
    i. I have created the order and filled the ```created_at``` field with current time and ```updated_at``` field with current time - 3 hours, I did this so that when the user for first time tries to update I don't have to do any additional checks, I can directly do a query in less than format.   
    ii. I have used a central variable in which I am keeping the last created at order time so that when next request comes up, we can compare the time and if the request comes up within 3 hours then we won't create the order.
   
  b. **Update order**:   
    i. I have made a filter query where I am checking the field ```updated_at``` should be less than less than 3 hours then only it will update the record else we will show user message that record has been updated within 3 hours.   
   
  c. **Get order**:
    i. Get order works simply taking a ID and if record exists then give the record to user else present him that no record found.   

  d. **Get All Orders**:
    i. Here also, if records exist then we display them else show user that no records found.   

  e. **Delete Order**:
    i. Get order works simply taking a ID and if record exists then delete the record to user else present him that no record found.  
   
## Running application:
   
The application can be run by - ```docker-compose up -d --build``` and I have attached a sample postman collection which can be imported and APIs can be tested out.
   
## Testing
   
I have created a dummy DB with dummy implementations for functions which helps me in testing my code.

## Considerations which can be made better if this code was in production:

  1. Instead of currently keeping a last created at in a central variable, I would keep it in a Redis key to fetch it quick and also write it in DB for when the value doesn't get in Redis, we can fetch it from DB. This way the last created at will not be lost.
  2. Concurrent requests can create a issue on last created at so some lock can also be created to avoid it.
  3. Proper authentication would be implemented for order fetch.
  4. Error handling related to more custom business logics will be implemented.