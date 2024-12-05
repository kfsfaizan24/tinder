const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://kfsfaizan24:MongoDB99@firstcopy.zkx20.mongodb.net/devTinder';
const connecToDB = async () => {
     await  mongoose.connect(connectionString);
}
module.exports =  connecToDB;