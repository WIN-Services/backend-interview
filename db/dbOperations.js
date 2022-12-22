const sqlite3 = require('sqlite3').verbose();
const path = require('path')

var dbFile = path.join(__dirname, 'oms.db')

//connecting to db
let db = new sqlite3.Database(dbFile, err => {
    if (err) {
        return console.log('error connecting db : ' + err)
    }
    console.log('Successfully connected to db')
});

console.log('directory name : ' + dbFile)

//adding the order
function addOrder(req) {
    return new Promise((resolve, reject) => {
        const id = req.id
        var dateTime = req.dateTime
        const totalfee = req.totalfee
        const services = JSON.stringify(req.services)
        console.log('id : ' + id + ' dateTime : ' + dateTime + ' totalfee : ' + totalfee + ' services + ' + services)
        var date = new Date()
        date = date.getTime()
        dateTime = date
        console.log('req: ' + JSON.stringify(req))
        db.run(`insert into orders (id,dateTime,totalfee,services) values(?,?,?,?)`, [id, dateTime, totalfee, services], function (err) {
            if (err) {
                reject('unable to add data' + err)
            } else {
                resolve("data added successfully")
            }
        })
    })
}

//fetching data from db
function showData(id) {
    return new Promise(resolve => {
        let sql = ``
        //query based on id give
        if (id == undefined) {
            sql = `SELECT * from orders`
        } else {
            sql = `select * from orders where id = (?)`
        }

        db.all(sql, id, (err, rows) => {
            if (err) {
                throw err;
            }
            var orderRecords = []
            //creating the json response
            rows.forEach((row) => {
                var temp = {}
                console.log(row.id + ' : ' + row.dateTime + ' : ' + row.totalfee + ' : ' + row.services)
                orderRecords.push({
                    "id": row.id,
                    "dateTime": row.dateTime,
                    "totalfee": row.totalfee,
                    "services": JSON.parse(row.services)
                })
                console.log('success')
            })
            //console.log('orders : '+JSON.stringify(orderRecords))
            resolve(orderRecords)
        })
    })

}

//deleting the rows
function deleteRow(id,dateFound) {
    return new Promise((resolve, reject) => {
        try {
            db.run("DELETE FROM orders WHERE id=(?) and dateTime=(?)", [id, dateFound], function (err) {
                if (err) {
                    reject({
                        status:500,
                        "message":err
                    })
                }
                else {
                    resolve({
                        status:202,
                        "message":`order id : ${id} deleted successfully`
                    })
                }
            })
        } catch (err) {
            reject(err)
        }

    })
}

//updating the rows by id
async function updateRow(req,dateFound) {
    return new Promise((resolve, reject) => {
        try {
            const id = req.id
            var dateTime = req.dateTime
            const totalfee = req.totalfee
            const services = JSON.stringify(req.services)
            let sql = "update orders set totalfee=(?),dateTime=(?),services=(?) WHERE id=(?) and dateTime=(?)"
            db.run(sql, [totalfee, dateTime, services, id, dateFound], function (err) {
                if (err) {
                    reject({
                        status:500,
                        "message":err
                    })
                }
                else {
                    resolve({
                        status:200,
                        "message":`order id : ${id} updated successfully`
                    })
                }
            })

        } catch (err) {
            reject({
                status:500,
                "message":'error during updating the table'
            })
        }

    })
}

//checking if the id is present or on and fetch the last added id
async function dateCheck(id) {
    return new Promise((resolve, reject) => {
        try {

            var idExists = false
            var dateFound = null
            db.all(`SELECT * from orders where id = (?) order by dateTime desc`, id, (err, rows) => {
                if (err) {
                    reject('error : ' + err)
                }
                else {
                    var latestRow = rows[0]
                    if (latestRow !== undefined) {
                        idExists = true
                        dateFound = latestRow.dateTime
                        resolve({
                            "idExists":idExists,
                            "dateFound":dateFound
                        })
                    }else{
                        resolve({
                            'idExists':idExists,
                            "dateFound":dateFound
                        })
                    }
                    
                }

            })
        } catch (err) {
            reject(err)
        }

    })
}

//checking if the ids provided in order request doesnot have other idsexcept that are present in services table
function checkServices(reqServices) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id from service_records`;
        var services = []
        var requestServices = []
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject({
                    "status":500,
                    "message":err
                })
            }else{

                rows.forEach((row) => {
                    console.log(row.id)
                    services.push(row.id)
                })
    
    
                reqServices.forEach((reqService) => {
                    requestServices.push(reqService.id)
                })
                //eliminate duplicate requested services
                var unique = requestServices.filter((value, index, self) => {
                    return self.indexOf(value) === index;
                });
        
                var count = unique.length
                console.log(' req services : '+JSON.stringify(unique))
                console.log(' db services : '+JSON.stringify(services))
                for (var i = 0; i < services.length; i++) {
        
                    for (var j = 0; j < unique.length; j++) {
                        if (services[i] === unique[j]) {
                            console.log(services[i]+' : '+unique[j])
                            count--;
                            break;
                        }
                    }
                }
        
                if(count === 0){
                    resolve(true)
                }else{
                    reject({
                        "status":406,
                        "message":"services doesnot exists"
                    })
                }
    
                
            }


        })


    })
}
//showData()
module.exports = {
    db, deleteRow, showData, addOrder, updateRow, checkServices, dateCheck
};