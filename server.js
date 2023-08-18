const app = require('./app');
const { sequelize } = require('./models/index');
const port = process.env.PORT || 3000;

app.listen(port, async() => {
    console.log(`Connected to port ${port} :)`)
})