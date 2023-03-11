# WIN Backend Engineering Interview

It is a complete project includes all CRUD APIs with their corressponding test cases.
It is complete dockerize using Dockerfile and docker-compose.yml file.

#A demo video is attached that gives a brief walkthrough from very beginning to end.

https://user-images.githubusercontent.com/82873133/224509676-f6c373c7-fca2-4ba4-9926-75981ec199a7.mp4

#what changes require to make it production ready.
There are various steps that needs to be taken care to make it live.
1. it currently has only one postgre connection. in production, we must use connection pool with finetune params like idle timeout of conn. , core pool size, max pool size, etc..
2. it is running on sigle thread here. in production, cluster mode is a must to utilise all cpu resources. usually, pm2 is being used to run node in cluster mode. although, one can directly use cluster native module of nodejs.
3. in production it is better to use some standard design patterns to make code more extendable as app scale in future. ex-> instead of directly fetching db.js there must be factory method that will take db name and fetch the respective db client.
4. separate env. variable in some global registry is preferable as it may scale and distribute to different services in future then a global config file is better than each has their own local config file.
5. to implement business logic that creation/updation must not allow if there is an existing order in last three hours. here, we are calling db everytime to see whwether there is a order or not in last three hours. in production, there should be a cache that would store the last creation/updation datetime, then we can directly query redis which is blaziingly fast than doing postgress call.


