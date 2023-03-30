console.log("Start")

const
    app  = require('./App.js');
    port = 8000;

app.listen(port,() => {
    console.log("Test Server started at %d",port);
});