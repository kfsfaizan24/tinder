/*
POST - signup,
POST - /login,
POST - /logout
*/
const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const cookieParser = require('cookie-parser');
const {checkForValidProfile, makeHashPassword, createJWT} = require('../utils/common');
const bcrypt = require("bcrypt");


authRouter.use(cookieParser());

authRouter.post('/signup', async (req, res) => {
    try {
        const data = checkForValidProfile(req.body);
        data.password = await makeHashPassword(req.body.password);
        const userInstance = new User(data);
        await userInstance.save();
        res.status(200).send("profile has been created successfully!");

    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

authRouter.post('/login', async (req, res) => {
        try {
            if (!req.body.email && !req.body.password) {
                throw new Error('Email and password must be present');
            }
            const userProfile = await User.findOne({email: req.body.email}, {}, {});
            if (!userProfile) {
                throw new Error('User not found');
            }
            const isPasswordMatch = await bcrypt.compare(req.body.password, userProfile?.password);
            if (!isPasswordMatch) {
                throw new Error('invalid credentials');
            }
            const token = await createJWT(userProfile?._id);
            res.cookie('token', token);
            res.send("user logged in successfully!");
        } catch (error) {
            res.status(400).send(error.message);
        }

    })

authRouter.post('/logout', async (req, res) => {
    try{
        res.clearCookie('token');
        res.send('logged out successfully!');
    }
    catch (error) {
        res.status(400).send(error.message);
    }

})

module.exports = authRouter;