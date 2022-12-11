const app = require('./app');
const { dbConnect} = require("./config/database")


dbConnect();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
