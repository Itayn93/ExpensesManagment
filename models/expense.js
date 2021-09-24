const mongoose = require('mongoose');


const costSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    UserId:String,
    Date:String,
    Category:String,
    Description:String,
    Sum:Number
});



module.exports = mongoose.model('expense',costSchema,"costs");