
module.exports = function (app) {
    const orderRoutes = require('./orderRoutes');
    const serviceRoutes = require('./serviceRoutes');

    app.get('/', (req, res) => {
        return res.send(
             "Welcome to Order system."
        )
    })

    app.use('/order', 
        [
            orderRoutes,
        ]
    );

    app.use('/service', 
    [
        serviceRoutes
    ]
);
};