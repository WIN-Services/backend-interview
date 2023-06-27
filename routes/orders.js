const express = require('express');
const router = express.Router();
const pool = require('../db.js');

const checkOrderTime = require('../middleware.js')

// for getting all orders
router.get('/', (req, res) => {
  pool.query('SELECT * FROM orders', (error, results) => {
    if (error) {
      return res.status(500).send()
    }
    return res.status(200).send(results.rows);
  });
});

// for getting a order with particular id

router.get('/:id', (req, res) => {
  pool.query('SELECT * FROM orders where id = $1', [req.params.id] , (error, results) => {
    if (error) {
      console.error(error);
      return;
    }
    return res.status(200).send(results.rows);
  });
});

// checkOrderTime middleware is used to check the time if previous order is created within 3 hours 
// for creating a order

router.post('/',checkOrderTime, async(req, res) => {
  try {
    const { totalfee, services } = req.body;
    const query = 'INSERT INTO orders ( totalfee , services) VALUES ($1, $2 )';
    const values = [ totalfee , services];
    await pool.query(query, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error saving data:', error);
    res.sendStatus(500);
  }
});

//for updating a order 

router.put('/:id', async(req, res) => {
  const id = req.params.id;
  const updateFields = req.body; // Assuming the fields to update are passed in the request body

  try {
    const client = await pool.connect();
    const fieldNames = Object.keys(updateFields);
    const fieldValues = Object.values(updateFields);

    let updateQuery = `UPDATE orders SET `;
    const updateParams = [id];

    fieldNames.forEach((fieldName, index) => {
      updateQuery += `${fieldName} = $${index + 2}, `;
      updateParams.push(fieldValues[index]);
    });

    updateQuery = updateQuery.slice(0, -2); // Remove the trailing comma and space
    updateQuery += ` WHERE id = $1`;

    await client.query(updateQuery, updateParams);
    client.release();

    res.status(200).json({ message: 'Fields updated successfully' });
  } catch (error) {
    console.error('Error occurred during update:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// for deleting order
router.delete('/:id', async(req, res) => {
  try {
    const query = 'DELETE FROM orders where id = $1';
    const values = [ req.params.id];
    await pool.query(query, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error saving data:', error);
    res.sendStatus(500);
  }
});


module.exports = router;