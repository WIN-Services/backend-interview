const sqlite3 = require('sqlite3').verbose();
const path = require('path')
console.log('1')
var dbFile = path.join(__dirname, 'omsTest.db')

let db = new sqlite3.Database(dbFile, err => {
    if (err) {
        return console.log('error connecting db : ' + err)
    }
    console.log('Successfully connected to db')
});
console.log('2')
function createTable(){
  
    return new Promise((resolve,reject)=>{
        try{
            db.serialize(()=>{
                db.run('CREATE TABLE service_records(id int primary key not null,name text not null)')
                .run('CREATE TABLE orders (id int not null,dateTime text not null,totalfee text not null,services text not null)')
            resolve('done')
            })
        }catch(err){
            resolve('not done')
        }
        
    })

}

function insertServices(id,name){
    return new Promise((resolve,reject) =>{
        db.serialize(()=>{
            db.run(`insert into service_records (id,name) values(?,?)`,[123,"Inspection"])
            .run(`insert into service_records (id,name) values(?,?)`,[789,"Testing"])
            .run(`insert into service_records (id,name) values(?,?)`,[456,"Analysis"])
        })
    
    })
}

function insertOrders(){
   return new promises((resolve,reject) =>{
    db.serialize(()=>{
        db.run(`insert into orders (id,dateTime,totalfee,services) values(?,?,?,?)`, [223, 1671688972872, 100, `[{"id":123}]`])
        .run(`insert into orders (id,dateTime,totalfee,services) values(?,?,?,?)`, [224, 1671688972872, 100, `[{"id":789}]`])
        .run(`insert into orders (id,dateTime,totalfee,services) values(?,?,?,?)`, [225, 1671688972872, 100, `[{"id":456}]`])
    })
   })
 
}

module.exports = {
    createTable,insertServices,insertOrders,db
};