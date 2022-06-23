const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const verifyToken = require("./verifyToken");

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(verifyToken);

module.exports = router;
