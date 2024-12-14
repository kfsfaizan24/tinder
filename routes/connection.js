const express = require("express");
const connectionRouter = express.Router();
const adminAuth = require("../middleware/adminAuth");
const connection = require("../models/connections");

connectionRouter.post("/request/:userId", adminAuth, async (req, res) => {
    try{
        if(!req.id || !req.params.userId){
            throw new Error("Error while trying to send request");
        }
        const data = {
            senderId : req?.id,
            receiverId : req?.params.userId,
        }
        const connectionInstance = new connection(data);
        await connectionInstance.save();
        res.status(200).send("request send successfully");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = connectionRouter;