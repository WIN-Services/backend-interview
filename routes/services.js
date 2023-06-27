const express = require('express');
const router = express.Router();
const pool = require('../db.js');

router.delete('/:id', async(req, res) => {
  try {
    const query = 'DELETE FROM services where id = $1';
    const values = [ req.params.id];
    await pool.query(query, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error saving data:', error);
    res.sendStatus(500);
  }
});

router.get('/', (req, res) => {
  try {
    pool.query('SELECT * FROM services', (error, results) => {
      if (error) {
        return res.status(500).send()
      }
      return res.status(200).send(results.rows);
    });
    
  } catch (error) {
    console.error('Error getting data:', error);
    res.sendStatus(500);
  }

});

router.post('/', async(req, res) => {
  try {
    const { name } = req.body;
    const query = 'INSERT INTO services ( name) VALUES ($1 )';
    const values = [ name];
    await pool.query(query, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error saving data:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
