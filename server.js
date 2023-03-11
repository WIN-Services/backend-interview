const db = require("./util/database");
const makeApp = require('./app')

console.log("server.js file")
const port = process.env.SERVER_PORT || 8080

startApplication();

async function startApplication(){
    try {
        const app = await makeApp(db)
        app.listen(port, () => console.log("listening on port:", port))
    } catch (err) {
        console.log("Something Went Wrong!", err)
    }
}