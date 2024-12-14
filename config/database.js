const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://kfsfaizan24:JSxXlnSU1RZQ4vL2@firstcopy.zkx20.mongodb.net/devTinder';
const connecToDB = async () => {
     await  mongoose.connect(connectionString);
}
module.exports =  connecToDB;