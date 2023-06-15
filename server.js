const express = require('express');
const { Order,ServiceRecord,sequelize,sequelizeError } = require('./models/model');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll({ include: ServiceRecord });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: ServiceRecord });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const { id, datetime, totalfee, services } = req.body;
    const order = await Order.create({ id, datetime, totalfee });
    await order.setServiceRecords(services);
    res.status(201).json(order);
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      res.status(400).json({ error: 'Invalid service record ID' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.put('/orders/:id', async (req, res) => {
  try {
    const { datetime, totalfee, services } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.setServiceRecords(services);
      await order.update({ datetime, totalfee });
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    if (error.name === sequelizeError.FOREIGNKEY_CONSTRAINT_ERROR) {
      res.status(400).json({ error: 'Invalid service record ID' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.delete('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


sequelize
.sync()
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.error('Database connection failed:', error);
});

module.exports = app;
