var mongoose = require("mongoose");
//schema and model for database

var campgroundSchema = new mongoose.Schema({
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String,
    },
    comments:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Comment"
            }
    ],
    name:String,
    price:String,
    image:String,
    description:String,
    location:String,
    lat:Number,
    lng:Number,
});

module.exports = mongoose.model("campground",campgroundSchema);