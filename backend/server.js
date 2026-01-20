const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./models');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(express.json());

// Import Routes
const loginRoute = require('./routes/Login');
const signupRoute = require('./routes/Signups');
const otpRoutes = require('./routes/OTPRoutes');
const publicJobRoutes = require('./routes/publicJobRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');

// Mount Routes
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/api/otp', otpRoutes);
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api', require('./routes/jobCategoryRoutes'));
app.use('/api/industries', require('./routes/industry.routes'));
app.use('/api/locations', require('./routes/location.routes'));
app.use('/api/jobtitles', require('./routes/jobtitle.routes'));

// New user-facing routes
app.use('/api/public', publicJobRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/user', userProfileRoutes);


const PORT = process.env.PORT || 5000;

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
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
