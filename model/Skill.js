const mongoose = require("mongoose")

const skillSchema = new mongoose.Schema({
    photo:{
        type: String,
    }
},{timestamps:true})

module.exports = mongoose.model("Skill",skillSchema)