const express = require("express");
const User = require("../models/users");

const router = express.Router();

router.post("/register", async (req, res) => {

    try {
        // Get user input
        const {username, role} = req.body;

        // Validate if user exist in our database
        const oldUser = await User.findOne(
            {
                $or: [
                        {'role': role},
                        {'username': username}
                    ]
            });

        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }

        // Create user in our database
        var crypto = require("crypto");
        var password = crypto.randomBytes(3).toString('hex')
        const user = new User({
          username,
          role,
          password
        });

        const savedUser = await user.save();

        // return new user
        res.status(201).json({ username: user.username, role: user.role, password: user.password});

    } catch (err) {
      console.log(err);
    }

});

module.exports = router;
