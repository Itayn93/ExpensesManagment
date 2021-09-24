const mongoose = require('mongoose');


const userChangesSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Fullname:String,
    Username:String,
    Password:String,
    UserId:String,
    Birthday:Date,
    Maritalstatus:String,
    Revision:Number
});

module.exports = mongoose.model('UserChanges',userChangesSchema,"userschanges");