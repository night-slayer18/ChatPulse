const express = require('express');
const connectDB = require('./db/connectDB');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send({ message: 'Hello from server!' });
});

app.use('/api/auth', require('./routes/auth.routes'));

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening on port ${PORT}`);
});