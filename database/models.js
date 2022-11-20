module.exports = (sequelize) => {
    const modelDefiners = [
        require('../models/order'),
        require('../models/service'),
    ];

    for (const modelDefiner of modelDefiners) {
        modelDefiner(sequelize);
    }
};
