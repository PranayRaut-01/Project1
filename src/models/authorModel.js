const mongoose = require('mongoose');

///////////////// [ AUTHOR SCHEMA HERE ] /////////////////
const authorSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    title:{
        type:String,
        enum:["Mr","Mrs","Miss"]
    },
    email:{
        type:String,
        unique:true,
        required:true,        
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

///////////////// [ EXPRORTED AUTHOR MODEL ] /////////////////
module.exports = mongoose.model("Author", authorSchema)