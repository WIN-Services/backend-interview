Order API Endpoints
GET /orders
Retrieves all orders.

GET /orders/:id
Retrieves a specific order by its ID.

POST /orders
Creates a new order.

PUT /orders/:id
Updates an existing order with the specified ID.

DELETE /orders/:id
Deletes an order with the specified ID.

Middleware
The following middleware is implemented:

checkOrderTime: Ensures that an order cannot be created or updated within 3 hours of a pre-existing order.

serices API Endpoints
GET /services
Retrieves all services.

POST /services
Creates a new service.

DELETE /services/:id
Deletes a service with the specified ID.