const db = require("./util/database");
const makeApp = require('./app')

console.log("server.js file")
const port = process.env.SERVER_PORT || 8080

function startServer(app){
    app.listen(port, () => console.log("listening on port:", port))
}

const app = makeApp(db, startServer)