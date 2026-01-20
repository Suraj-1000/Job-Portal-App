const moduleAlias = require("module-alias");
moduleAlias.addAlias("@", __dirname);

const express = require('express');
const db = require('@/models');
const { appConfig, envConfig } = require('@/config');
const routes = require('@/routes');
const { errorMiddleware } = require('@/middlewares/errorMiddleware');

const app = express();

// Configuration (CORS, BodyParser, etc.)
appConfig(app);

// Mount All Routes
app.use('/api', routes);

// Error Handling Middleware
app.use(errorMiddleware);

// Test route for Sequelize
app.get('/', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.send('Database connected successfully (Sequelize)');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to Database');
  }
});

db.sequelize.sync().then(() => {
  console.log("✅ Database connected successfully");
  app.listen(envConfig.PORT, () => {
    console.log(`Server running on port ${envConfig.PORT}`);
  });
});
