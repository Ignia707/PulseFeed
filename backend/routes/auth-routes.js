// all routes are related to auth and author


const express = require('express');

const {
    registerUser,
    loginUser
} = require('../controllers/auth-controller');


const router = express.Router();

// routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;