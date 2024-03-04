const express = require('express');
const { loginUser, signupUser, logoutUser } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/signup',signupUser);

router.post('/login',loginUser);

router.post('/logout',logoutUser);

module.exports = router; 