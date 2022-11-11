
    - A description of your solution at a high-level, including language used, framework used, roughly how it works, etc.
    
      Framework used: NestJs
      ORM - TypeOrm
      Database: Postgres
      Language Used: TypeScript
    
      The assignment contains the CRUD apis for Orders and Services. Postman can be used to hit the APIs. Swagger is also configured for the assignment.

      Assignment Setup Steps:
      create a .env file in the root folder using .env.example
      npm install
      npm run start:dev

      For running the test cases:
      first populate .test.env file
      npm run test

      Swagger Docs -> http://localhost:<PORT>/docs

    - What trade-offs you made

      Will take more time to deploy as the code is in typescript hence some steps are increased in the DockerFile but will be advantagious as the size of the project increase.

      Assumed that request are already authenticated. 

    - Any assumptions you made that affected your solution

      no assumptions were taken.

    - What you would change if you built this for production

        put ip restriction on RDS instance
        Add logging to the application
        Add monitoring
        give access to limited authozied people
        backup the last image that was deployed in production in case of rollback
        create migration jobs for database.
        
    - Brief instructions on how to setup the environment to run your project

        Assignment Setup Steps:
          create a .env file in the root folder using .env.example
          npm install
          npm run start:dev

    - What parts of the spec were completed, how much time you spent, and any particular problems you   ran into

        All parts of the spec were completed. I spent around 4 hrs on the assignment. 
        Rds setup took time as I was doing it for the first time and my code was not able to connect to the db, after doing some research I found out that I have add my IP to the security group and I didn't know how to do that too.
        

