
. Clone the repository and in the same folder use `npm i` to install the packages
		2. Set up an environment variable with name `AdminEmail` for a specific email that can be used as an admin or super user.
		3. In the terminal, type `nodemon start` to run the code.
		
        ## Technologies used
		1. Nodejs
		2. Expressjs
		3. MongoDB
		
        ### Orders
		1. `localhost:2000/order/currentorder` with `POST` Request
		- Use this to make new order
		- Takes one field `serviceIndices` as an array eg:`[1,2,3]` where elements of this array are the service index for a specific service.
		- Returns order object
		2. `localhost:2000/order/delete/:id` with `DELETE` Request
		- Use this to remove the whole order
		- Takes order id as paramater
		
        
        ## Assumptions
		- I assumed that there has to be an order management system to be made where Admin can add Services which are then ordered by customers.
		- Customer/user will add services they choose to buy in a cart where they see their total amount and service selected names.
		- Admin can see all orders and add new services that are to be offered.
		- For testing i have used to Postman on my local system to validate the working.
		

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
        
        ##Difficulties 
        -we use postman for API Framework and testing.
        -In postman if we given right password then it shows you are not admin so for conquring this problem it will take time
        -Adding new services again and again is big problem
        -For adding forgot password feature we need more lage data sets
		


