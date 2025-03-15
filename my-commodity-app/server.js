// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const categoryRoutes = require('./routes.js'); // Ensure correct path

// Middleware to parse incoming JSON data
app.use(express.json());

// Use the routes from 'routes.js'
app.use('/api', categoryRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});