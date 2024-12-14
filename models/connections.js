const mongoose = require('mongoose');

const connection = new mongoose.Schema({
    senderId : {
        type: String,
    },
    receiverId : {
        type: String,
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    updatedAt : {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("Connection", connection);
