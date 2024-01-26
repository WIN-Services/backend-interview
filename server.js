const express = require('express');
const app = express();
const port = 4000;
const routes = require('./routes');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api', routes)

app.listen(port, () => {
  console.log(
    `Win Home Inspection app listening at ${port}`
  );
});
