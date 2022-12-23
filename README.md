# Varun's Backend Engineering Interview

## How to run

1. Clone the repository and in the same folder use `npm i` to install the packages
2. Set up an environment variable with name `AdminEmail` for a specific email that can be used as an admin or super user.
3. In the terminal, type `nodemon start` to run the code.

## Assumptions
 - I assumed that there has to be an order management system to be made where Admin can add Services which are then ordered by customers.
 - Customer/user will add services they choose to buy in a cart where they see their total amount and service selected names.
 - Admin can see all orders and add new services that are to be offered.
 - For testing i have used to Postman on my local system to validate the working.
 
 ## Technologies used
 1. Nodejs
 2. Expressjs
 3. MongoDB
 
 ## Routes
 ### Login/Register
 1. `localhost:2000/register` with `POST` Request
      - Use this to register new users.
      - Takes two fields `email` and `password`
 2. `localhost:2000/login` with `POST` Request 
      - Use this to login a user
      - Take two fields `email` and `password`
 ### Services
 1. `localhost:2000/service/addservice` with `POST` Request
      - Use this to add new services
      - Takes three fields `name`, `cost` and `index`
      - This is Admin specific feature. Use the same email for login as AdminEmail
 2. `localhost:2000/service/all` with `GET` Request
      - Use this to view all the services currently present
 
 ### Orders
 1. `localhost:2000/order/currentorder` with `POST` Request
      - Use this to make new order
      - Takes one field `serviceIndices` as an array eg:`[1,2,3]` where elements of this array are the service index for a specific service.
      - Returns order object
 2. `localhost:2000/order/update/:id` with `POST` Request
      - Use this to remove one service at a time from the current order
      - Takes one field `serviceToRemove` with the service index to be removed.
      - Takes order id as paramater
 3. `localhost:2000/order/delete/:id` with `DELETE` Request
      - Use this to remove the whole order
      - Takes order id as paramater
 4. `localhost:2000/order/userOrders` with `GET` Request
      - Returns the logged in user's orders
 5. `localhost:2000/order/all` with `GET` Request
      - Returns orders from all users
      - Can only be used by Admin with AdminEmail
 
## Basic Working
- New user registers and logins which set a `user_id` in the cookie.
- `user_id` is used to authenticate user implemented using middleware
- User can see all services, create new order, see all of their orders, update order, and delete order.
- Admin can add new services and see all orders.

## Future Scope
There are alot of impprovements that can be made and are necesarry as well. Here are a few:
- Login/register should have password authentication, email verification, password encryption.
- Instead of having just one Admin user we can have multiple role based users having access to specific data and routes.
- More CRUD operations in the Order section can be added that will be more useful
- Error handling can be more precise and easy
- User validation through middleware should be added to be fool proof


