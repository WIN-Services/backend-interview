const app = require('./app');
const db = require('./models'); 

const PORT = process.env.PORT || 3000;

// Sync the Sequelize models with the database
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
});
