<h1>README</h1>
<h2>Description</h2>
This project is a simple RESTful API for managing orders and services. It is built using Python and Flask framework, and a PostgreSQL database. The API has four endpoints to create, read, update, and retrieve orders.
<br>
When an order is created or updated, the API calculates the total fee of the services provided in the order. The API also prevents creating or updating an order if there is an order created within the last three hours.
<br>
<h2>Trade-offs</h2>
One of the trade-offs made in this solution is the simplicity of the API. While it satisfies the basic requirements of creating, reading, updating, and retrieving orders, it does not have advanced features such as authentication, authorization, pagination, or filtering.
<br>
Another trade-off is the use of a small database schema. The current schema is suitable for the current requirements, but it may not scale well if more features are added in the future.
<br>
<h2>Assumptions</h2>
The solution assumes that the services are predefined and stored in the database. It also assumes that the services are not deleted or modified once they are created.
<br>
<h2>Changes for production</h2>
If this API is built for production, some changes can be made to improve its quality and scalability. One of the changes would be to add authentication and authorization to secure the API. Another change would be to add pagination and filtering to handle large amounts of data.
<br>
To improve the scalability of the API, it would be better to use a more sophisticated database schema, such as a relational schema, and use a distributed database.
<br>
<h2>Setup instructions</h2>
To run this project, follow the instructions below:
<ol>
<li>Clone the repository: git clone https://github.com/{github-username}/{repository-name}.git</li>
<li>Navigate to the project directory: cd {repository-name}</li>
<li>Install the required packages: pip install -r requirements.txt</li>
<li>Create a PostgreSQL database named orders on your local machine.</li>
<li>Run the following command to create the tables: python create_tables.py</li>
<li>Start the server: python app.py</li>
<li>The API can be accessed through http://localhost:5000</li>
</ol>
<br>
<h2>Spec completion</h2>
All of the API endpoints in the spec were completed, including the testing suite. The total time spent on the project was about 2 hours.
<br>
One problem that was encountered during the development was related to the formatting of the datetime objects returned by the API. The format of the datetime objects was different between the database and the API response. This problem was resolved by converting the datetime objects to a consistent format in the API.