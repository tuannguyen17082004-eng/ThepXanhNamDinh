const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
    try {
    const token = req.cookies.token;

    if (!token) 
        return res.status(401).send("Bạn cần đăng nhập để thực hiện hành động này!");

    const data = jwt.verify(token, process.env.JWT_KEY);
    req.data = data;
    next();

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}