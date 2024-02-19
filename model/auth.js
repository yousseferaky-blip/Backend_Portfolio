const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim: true,
    },
    email: {
        type:String,
        required: true,
        trim: true,
        unique:true,
        lowercase: true
    },
    password:{
        type:String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user'],
        default: 'user'
    },
},{timestamps:true})


module.exports = mongoose.model("User",UserSchema)