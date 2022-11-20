const Sequelize = require('sequelize');

const { successLog, noticeLog, errorLog } = require('../helpers/loggers');


function initiateDatabase() {
    const sequelize = new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USER_NAME,
        process.env.DATABASE_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            logging: noticeLog,
            define: {
                timestamps: false,
            },
        }
    );

    //IIFE
    (async function () {
        try {
            await sequelize.authenticate();
            successLog(
                'CONNECTED TO DB :',
                'Connection has been established successfully.'
            );
        } catch (error) {
            errorLog(
                'DB CONNECTION ERROR :',
                'Unable to connect to the database:' + error
            );
        }
    })();

    require('./models')(sequelize);

    require('./associations')(sequelize);


    sequelize.sync();

    //Run Model seeders (For Order and Service preexisting data)

    // sequelize.sync({
    //     alter: true,
    //    force: true
    // }).then(async () => {
    //    await require('../models/modelSeeders/service')(sequelize)
    //    await require('../models/modelSeeders/order')(sequelize)
    // });

    return sequelize;
}

module.exports = initiateDatabase();
