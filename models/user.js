const mongoose = require("mongoose");
const validator = require("validator");
const  user = new mongoose.Schema({
   firstName: {
       type: String,
       maxLength: 20,
   },
   lastName : {
       type: String,
       maxLength: 20,
   },
    email : {
       type: String,
        required: true,
        unique : true,
        immutable: true,
        validate: {
           validator : function (value){
               if(!validator.isEmail(value)){
                   throw new Error("Email is not valid");
               }
           }
        }
    },
    password: {
       type: String,
        required: true,
        validate: {
           validator : function (value){
               if(!validator.isStrongPassword(value)){
                   throw new Error("Please choose strong password");
               }

           }
        }
    },
    contact:{
       type: Number,
        maxLength: 10,
    },
    gender: {
       type: String,
    },
    skills : {
       type: [String],
    },
    profileUrl: {
       type: String,
        default: "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
        validate: {
           validator : function (value) {
               if(!validator.isURL(value)){
                   throw new Error("Please enter a valid URL");
               }
           }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", user);