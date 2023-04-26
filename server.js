const express = require('express');
const app = express();
const ordersRouter = require('./routes/index');
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/dev', ordersRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});