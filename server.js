const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import Routes
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const studentRoutes = require('./routes/studentRoutes');
const attendantRoutes = require('./routes/attendantRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendants', attendantRoutes);

const PORT = 5001;

app.get('/test', (req, res) => {
    res.send("THE SERVER IS LIVE AND FULLY WIRED!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});