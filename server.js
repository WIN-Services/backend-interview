const app = require('./app');

const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=> console.log("Server Running on PORT",PORT));