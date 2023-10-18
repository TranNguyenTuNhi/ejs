const jwt = require('jsonwebtoken');
const { model } = require('mongoose');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token)
        return res
            .status(401)
            .json({ success: false, message: 'Access token not found' });
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError)
            return res
                .status(401)
                .json({ success: false, message: 'Token expired' });
    }
};

module.exports = verifyToken;
