const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');


const connectDB = require('./db/connectDB');
const { app, server } = require('./socket/socket');

const PORT = process.env.PORT || 5000;

const ___dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/messages', require('./routes/message.routes'));
app.use('/api/users', require('./routes/user.routes'));

app.use(express.static(path.join(___dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(___dirname, 'frontend', 'dist', 'index.html'));
})

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening on port ${PORT}`);
});