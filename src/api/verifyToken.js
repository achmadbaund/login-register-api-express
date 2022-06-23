const express = require("express");
const User = require("../models/users");
const { isAuthenticated } = require("../../middleware/auth");
const router = express.Router();


router.get("/verify-token", isAuthenticated, (req, res) => {
    res.json({ is_valid: true, username: req.username });
});


module.exports = router;