require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const resumeRoutes = require('./routes/resume');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/resumes', resumeRoutes);

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-builder')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
