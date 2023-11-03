const express = require('express');
const { sequelize } = require('./config/config');
const app = express();
app.use(express.json());

const router = require('./routes/routes');
app.use('/api', router);

const PORT = process.env.PORT || 3000;

// Synchronize models with the database
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port ${PORT}");
    });
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing models:', error);
  });


