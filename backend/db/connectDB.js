const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const connectionURI = await mongoose.connect(process.env.MONGO_DB_URL);

        console.log(`MongoDB connected: ${connectionURI.connection.host}`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;