//schema = data format

const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    password:{
        type:String,
        required:true,
    },
    first_name:{
        type:String,
        required:true,
    },
    middle_name:{
        type:String,
    },
    last_name:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true,
    },
    pic:{
        type:String,
        required:true,
    }
})



//we are creating a new collection

const UserCollection = new mongoose.model("UserCollection", userSchema)

module.exports = UserCollection;    