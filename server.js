const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongodb = require('./database/db');

mongoose.Promise = global.Promise;

mongoose.connect(mongodb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database Connected Successfully');
},
    error => {
        console.log('Database Error:' + error);

    }
)

//Server Creation
const orderRoute = require('./routes/routes');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/order')));

//API root
app.use('/api', orderRoute);

//Port Create
const Port = process.env.port || 8000;
app.listen(Port, () => {
    console.log('Listening Port On: ' + Port);
});

//404 error handler
app.use((req, res, next) => {
    next(CreateError(404));
});

