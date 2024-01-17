const app = require("./server");

let port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App is running at port ${port}`)

})