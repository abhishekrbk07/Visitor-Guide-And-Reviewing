var mongoose = require("mongoose");

//schema and model for comments
var commentSchema = new mongoose.Schema({
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String,
        date:String,
    },
    text:String,
});

module.exports = mongoose.model("Comment", commentSchema);