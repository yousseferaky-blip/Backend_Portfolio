const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true
    },
    photo:{
        type: String
    },
    description:{
        type: String
    }
},{timestamps:true})

module.exports = mongoose.model("Service",serviceSchema)