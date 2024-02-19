const mongoose = require("mongoose")

const ToolSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true
    }
},{timestamps:true})

module.exports = mongoose.model("Tool",ToolSchema)