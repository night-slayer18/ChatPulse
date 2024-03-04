const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./db/connectDB');

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Hello from server!' });
});

app.use('/api/auth', require('./routes/auth.routes'));

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening on port ${PORT}`);
});