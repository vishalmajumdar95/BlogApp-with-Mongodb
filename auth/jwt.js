const jwt = require('jsonwebtoken');
require('dotenv').config();

// GenerateToken
const GenerateToken = user => {
    const token = jwt.sign(user, process.env.SECRET_KEY)
    return token
}

// AuthenticateToken
const AuthenticateToken = (req, res, next) => {
    try {
        // console.log(req.headers.cookie)
        var token = req.headers.cookie.split('=')[1];
        // console.log(token);
        if (token === undefined) {
            console.log({ message: "token not found" });
            res.status(403).json({ message: "JWT EXPIRED" })
        }
        jwt.verify(token, process.env.ACCESS_KEY, { expiresIn: '24h' }, (err, data) => {
            if (err) return res.status(403)
            req.data = data;
            // console.log(data);
            next();
        })
    } catch (err) {
        console.log({ message: err.message });
        res.send({ message: "Go to login first" })
    }
};

module.exports = { GenerateToken, AuthenticateToken };