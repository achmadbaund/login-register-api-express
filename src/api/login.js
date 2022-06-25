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
                { _id: user._id, username: user.username },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2m",
                }
            );

            const id = user._id
            //update Token user
            let updatedUser = {}
            updatedUser.token = jwtToken

            User.findByIdAndUpdate(id, updatedUser, function(err, updatedData){
                if(err){
                    // console.log(err)
                }
                else {
                    console.log(updatedData)
                }
            })

            // output
            res.status(201).json({ _id: user._id, username: user.username, token: jwtToken});
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

});


module.exports = router;