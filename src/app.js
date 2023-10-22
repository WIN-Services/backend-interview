const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();

app.use(express.json());

app.use('/api', orderRoutes);
app.use('/api', serviceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
