// Admin route

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');


router.get("/", authMiddleware, adminMiddleware, (req, res) => {
    res.json({
        message : 'Welcome to admin page'
    });
});

module.exports = router;