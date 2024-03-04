const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        enum: ["male","female"]
    },
    profilePic: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;