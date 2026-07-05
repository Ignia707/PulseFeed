// Auth middleware to protect Home route

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    // check if token present
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            success : false,
            message : 'Access denied. No token provided. Please login to access'
        });
    }

    // decode the token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // userInfo passed to next middlewares
        req.userInfo = decodedToken;
        next();
        

    } catch(err) {
        return res.status(401).json({
            success : false,
            message : 'Invalid or expired token'
        });
    }
}

module.exports = authMiddleware;