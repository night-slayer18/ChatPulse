const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
// const cors = require('cors');


const connectDB = require('./db/connectDB');
const { app, server } = require('./socket/socket');

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());
// app.use(cors());

app.get('/', (req, res) => {
    res.send({ message: 'Hello from server!' });
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/messages', require('./routes/message.routes'));
app.use('/api/users', require('./routes/user.routes'));

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening on port ${PORT}`);
});