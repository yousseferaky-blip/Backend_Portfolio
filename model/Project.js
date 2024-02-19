const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true
    },
    photo:{
        type: String
    },
    description:{
        type: String
    },
    link:{
        type: String
    }
},{timestamps:true})

module.exports = mongoose.model("Project",projectSchema)