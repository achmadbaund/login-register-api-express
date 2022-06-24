const jwt = require("jsonwebtoken");
const User = require("../src/models/users");

async function isAuthenticated(req, res, next) {
    try {
        let token = req.get("authorization");
        if (!token) {
            return res.status(404).json({is_valid: false, msg: "Token not found"});
        }
        token = token.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);

        var decoded = jwt.decode(token, { complete: true });

        req.expiredAt = new Date(decoded.payload.exp * 1000)
        req.username = user.username
        next()
    } catch (error) {
        return res.status(401).json({is_valid: false, msg: error.message});
    }
}


module.exports = { isAuthenticated }