const { connect } = require("mongoose");
const conf = require("../config");

let mongo;

function mongoConnect() {
    let MONGO_URI = conf.get('mongo').environment
    connect(MONGO_URI)
        .then((client) => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.error(err);
            console.log("Error in mongo connection");
        });
}

mongoConnect();


module.exports = {
    mongoConnect,
    mongo,
};
