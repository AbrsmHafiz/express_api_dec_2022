let mongoose = require("mongoose")

// setup new schema (schema is a technical name of db)
let mongoSchema =  mongoose.Schema

//map to song collection
let songCollection = new mongoSchema({
    "videoid": String,
    "likes": Number,
    "dislikes": Number,
    "views": Number

},{
    collection :"song"
})

module.exports = mongoose.model("myvideos", songCollection)
