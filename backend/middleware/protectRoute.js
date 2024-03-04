const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ error: "Not Authorized" });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ error: "Not Authorized" });
        }
        const user = await User.findById(verified.id).select('-password');
        if (!user) {
            return res.status(401).json({ error: "User Not Found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ error: "Not Authorized" });
    }
};

module.exports = protectRoute;