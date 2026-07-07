// all routes are related to auth and author


const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    changePassword
} = require('../controllers/auth-controller');

const authMiddleware = require('../middleware/auth-middleware');


// routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', authMiddleware,changePassword);

module.exports = router;