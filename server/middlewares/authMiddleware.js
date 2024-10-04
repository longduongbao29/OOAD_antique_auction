const jwt = require('jsonwebtoken');

// Xác thực JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

    jwt.verify(token, 'your_secret_key', (err, user) => {
        
        if (err) return res.status(403).json({ error: 'Invalid token' +err});

        req.user = user;
        next();
    });
};

// Middleware kiểm tra vai trò người dùng

module.exports = { authenticateToken };
