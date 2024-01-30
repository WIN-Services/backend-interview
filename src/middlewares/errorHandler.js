const errorHandler = (err, req, res) => {
  if (err.name === 'OrderNotFoundError') {
      // Handle "order not found" error
      return res.status(404).json({ error: 'Order not found' });
  } else if (err.name === 'PreexistingOrderError') {
      // Handle "preexisting order" error
      return res.status(400).json({ error: 'Cannot update order within 3 hours of an existing order' });
  } else {
      // Generic error handling for other types of errors
      console.error(err.stack);
      res.status(500).json({ error: 'Something went wrong!' });
  }
};

module.exports = errorHandler;
