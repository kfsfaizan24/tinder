const express = require('express');
const connecToDB = require('../config/database')
const users = require('../models/user');
const validator = require('../utils/validator');
const app = express();
const port = 8080;




app.use(express.json());
app.post('/signup',  ( async (req, res) => {
    try {
            const data = validator(req.body);
            const user = new users(data)
            await user.save();
            res.send("user successfully created");
    }
    catch (e) {
        res.status(400).send(e.message);
    }
}));
app.get('/feed', async (req, res) => {
    try {
        const allUsers = await users.find({});
        res.send(allUsers);
    }
    catch (e) {
        res.status(400).send("something went wrong");
    }
})
app.patch('/profile', async (req, res) => {
   try {
       if(req.body.email){
           throw  new Error('email cannot be set');
       }
       const id = req.body.id;
       const doc = await users.findByIdAndUpdate({_id:  id}, (req.body))
       res.send(doc);
   }
   catch (e) {
       res.status(400).send(e.message);
   }
})
app.delete('/profile', async (req, res) => {
    try {
         const email = req.body.email;
         await users.findOneAndDelete({email: email})
         res.send("user deleted");
    }
    catch (e) {
        res.status(400).send("something went wrong");
    }
})

connecToDB().then(() => {
    app.listen(port, () => {
        console.log("server is up and running..");
    });
}).catch((err) => {
    console.log(err);
})
