const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
    try {
        let token = req.get("authorization");
        if (!token){
            return res.status(404).json({ is_valid: false, msg: "Token not found" });
         }
        token = token.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.username = user.username;
        next();
    } catch (error) {
        return res.status(401).json({ is_valid: false, msg: error.message });
    }
}


module.exports = { isAuthenticated }