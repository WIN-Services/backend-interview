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
3. Enter the command `npm install` on the terminal in the project directory, to install the required packages
4. Create a new `.env` file in the project directory and provide environment variables. You can get the list of required environment variables from the `.env.example` file in the project root directory.
5. Now enter the command `npm run dev` to start the server locally.

<!-- > Note: Using the MongoDB atlas herent , the environmevariables will require the MongoDB username, password, and database name. -->
<!-- Todo -->
> Note: Added Postman Collection V2 export file for API testing (file is in the project root directory).

# Features of this project
1. Multiple User profiles, authentication, and authorization.
2. Each User can create orders that can be seen by anyone, and updated or deleted by the creator/owner User only.
3. Password of each user is stored in hashed form in the database.
4. Using a logger `morgan`, to display logs on each API request on the console and a particular log file.
5. Right now, `CORs` are set to allow everyone to access the server.
6. The APIs in this project have proper validation for inputs using `express-validator` and proper error messages respectively.
7. We are using `JWT tokens` for authentication and authorization.

# Things that can be improved in this project
<!-- 1. A CI/CD pipeline can be implemented. -->
2. More flexibility and customization with orders can be done.
3. Each user can have its own dashboard, which will return its relevant orders, details and stats.
4. More detailed error messages.
5. Different currencies can be supported based on location where service is provided.

I hope you like this project. In case of any queries, Please feel free to contact me via `deepanshujain088@gmail.com`
