const express = require('express');
const profileRouter = express.Router();
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/user')
const {editValidProfile} = require('../utils/common');

profileRouter.get('/view', adminAuth, async (req, res) => {
    try{
        console.log(req.id);
        const candidate = await User.findById(req?.id)
        res.send(candidate);
    }
    catch (error) {
        res.status(500).send(error.message);
    }

})
profileRouter.patch('/edit', adminAuth, async (req, res) => {
    try{
        const updatedProfile = await editValidProfile(req?.body);
        const candidate = await User.findByIdAndUpdate(req?.id, req.body);
        if(!candidate){
            throw new Error("profile not updated, please try again")
        }
        await candidate?.save();
        res.send(updatedProfile);
    }
    catch (error) {
        res.status(400).send(error.message);
    }


})
profileRouter.delete('/delete', adminAuth, async (req, res) => {
    try{
        const profile = await User.findByIdAndDelete(req?.id);
        res.send("profile deleted successfully");
    }
    catch (error) {
        res.status(500).send(error.message);
    }

})
profileRouter.patch('/updatePassword', adminAuth, async (req, res) => {})
module.exports = profileRouter;