const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');
const errorHandler = require('./src/utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for security & parsing
app.use(helmet()); // Security headers
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust for prod
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
