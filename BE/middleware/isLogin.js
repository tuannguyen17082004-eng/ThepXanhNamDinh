const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
    try {
    const token = req.cookies.token;

    if (!token) 
        return res.status(401).json({ message: 'Unauthorized' });

    const data = jwt.verify(token, process.env.JWT_KEY);
    req.data = data;
    next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}