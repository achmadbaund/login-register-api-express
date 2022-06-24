const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {

    try {
        // Get user input
        const { username, password } = req.body;

        // Validate if user exist in our database
        const user = await User.findOne({ 'username': username });

        if (user && user.password === password) {

            // Create token
            const jwtToken = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2m",
                }
            );

            // save user token
            data = User.findOne({id: user.id})
            user.update({token : jwtToken},
                (err,user)=>{
                    res.status(400).send('Error');
                });

            // output
            res.status(201).json({ id: user.id, username: user.username, token: user.token});
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

});


module.exports = router;