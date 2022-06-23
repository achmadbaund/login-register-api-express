const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {

    try {
        // Get user input
        const { username, password } = req.body;

        // Validate if user exist in our database
        const user = await User.findOne({ where: { username } });

        if (user && user.password == password) {

            // Create token
            const jwtToken = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2m",
                }
            );

            // save user token
            user.update({
                token : jwtToken
            }, {
                where : {
                    id: user.id /*like this*/  }}).then(function (data) {
                if (data) {
                    res.send(data)
                } else {
                    res.status(400).send('Error')
                }
            })

            // user
            res.status(201).json({ id: user.id, username: user.username, token: user.token});
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

});


module.exports = router;