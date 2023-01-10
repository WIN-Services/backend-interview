    - Language - Typescript
    - Framework - Express
    - A simple order apis are created with some dummy middleware like (user authorization), body validation is done and proper error code are returned
      put api just update the order state to delivered
    - database MySQl, database commondb , table orders
    - If for production I would have use another .env file and have use some log service to track log
    - To run the project  - fisrt run npm i
                          - then run 'tsc' to build project to javascript
                          - then run 'node .\build\server.js' to run the project (It will run on port 3000)
    - To setup the environment to run project  - use different .env file with production values like (password,port etc..)
    - Apart from update Api all others are OK (Update order newd some extra validations)

    - problem faced - Handling error with custom message
                    - creating a seperate validation file (for good looking code and reading)

    - Time required (almost 1hr 50 mins)

---To create order table with auto time stamp
create table orders (id BIGINT ,ct timestamp DEFAULT CURRENT_TIMESTAMP, ut timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,productId varchar(10) not null, buyerId varchar(10) not null , quantity int not null , amount int not null, orderState varchar(20) not null, PRIMARY KEY (id))

test cases-----
get By ID - get - http://localhost:3000/order/id/23445
get All - get - http://localhost:3000/order/getAll
create Order - post - http://localhost:3000/order/create  
 body - {"buyerId": "abcd1","productId": "abvf1","quantity": "23"}

update Order - put - http://localhost:3000/order/update/1673353846242
delete Order - delete - http://localhost:3000/order/delete/1673355360867
