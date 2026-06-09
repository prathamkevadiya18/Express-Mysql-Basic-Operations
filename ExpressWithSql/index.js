const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Express + MySQL API server! Go to /api/users to fetch users.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
