const helpers = require("../helpers/mongoCRUD");

async function insertRepo(body) {
    try {
        return await helpers.insertDocument({name: body.name}, "OrderMgmt","service");
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    insertRepo
};