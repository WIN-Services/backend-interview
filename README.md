# EnverXBEAssignment
Hi Fellow Developers, Myself **_Deepanshu Jain_**
    I am a Full Stack Developer with about 1.5 years of experience. I love to code and tackle interesting problems along the way.
    My technical skills encompass a diverse range of technologies, including:

    Tech Stack: MERN (MongoDB, Express.js, React.js, Node.js), SpringBoot, Next.js
    Databases: DynamoDB, MySQL, MongoDB
    Languages: JavaScript, TypeScript, HTML, CSS (including Tailwind CSS)
    Cloud Services: AWS EC2, SES, Lambda, Cognito, Amplify, Elastic Beanstalk, API Gateway, Docker, CI/CD Pipelines
    With hands-on experience in these technologies and more, I bring a comprehensive understanding of the development process and an ability to leverage cutting-edge tools to deliver exceptional results.

# How to run this project
1. Clone the repository to your system.
2. Checkout to the `development` branch.
3. Enter the command `docker compose up --build` on the terminal in the project directory, to install the required packages
<!-- Todo -->
> Note: Added Postman Collection V2 export file for API testing (file is in the project root directory).

# Features of this project
1. Multiple User profiles, authentication, and authorization.
3. Each User can create orders that can be seen by anyone, and updated or deleted by the creator/owner User only.
4. Password of each user is stored in hashed form in the database.
5. Using a logger `morgan`, to display logs on each API request on the console and a particular log file.
6. Right now, `CORs` are set to allow everyone to access the server.
7. The APIs in this project have proper validation for inputs using `express-validator` and proper error messages respectively.
8. We are using `JWT tokens` for authentication and authorization.
9. Separate routes to create new **Services** and get all **Services**.
10. Separate route for CRUD operations for **orders**, Create and Update Orders requires Services.
11. Few test cases defined for **Orders** route APIs.
12. Docker Compose file setup to run tests and deploy.

# Things that can be improved in this project
1. A CI/CD pipeline can be implemented.
2. More flexibility and customization with orders can be done.
3. Each user can have its own dashboard, which will return its relevant orders, details, and stats.
4. More detailed error messages.
5. More proper and strict test cases can be added.
6. Different currencies can be supported based on the location where the service is provided.

I hope you like this project. In case of any queries, Please feel free to contact me via `deepanshujain088@gmail.com`
