const pool = require('./db');
const checkOrderTime = async (req, res, next) => {
  try {
    // Fetch the pre-existing order from the database based on the user ID
    const {totalfee , services} = req.body
    query = 'select   datetime from orders where services::jsonb[] @>  $1::jsonb[] order by datetime limit 1'
    values = [services]
    const preExistingOrder = await pool.query(query , values);
    if (preExistingOrder) {
      const currentTime = new Date();
      const diffInMilliseconds = Math.abs(currentTime- preExistingOrder.rows[0].datetime);
       const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
       console.log(hours , diffInMilliseconds)
      if (hours <= 3) {
        // Return an error response if the new order is within the time threshold
        return res.status(400).json({ error: 'Creating/updating an order within 3 hours of a pre-existing order is not allowed' });
      }
    }
    next()
  } catch (error) {
    console.error('Error occurred during order time check:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = checkOrderTime;