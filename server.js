const express = require('express');
const db = require('./models');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

app.use('/orders', orderRoutes);

db.sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});