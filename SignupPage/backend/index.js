const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Ensure the 'authRouter.js' file exists in the Routes folder
const AuthRouter = require('./Routes/authRouter'); 

require('dotenv').config(); // Load environment variables from a .env file
require('./Models/db'); // Connect to the database (check if this file exists)

const PORT = process.env.PORT || 8080;

// Health check route
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Routes
app.use('/auth', AuthRouter); // Authentication routes

// 404 error handling for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
