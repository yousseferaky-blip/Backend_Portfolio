const skillSchema = require("../model/Skill")

exports.CreateSkill = async (req,res)=>{
    try{
        const skill =  new skillSchema({
            photo:req.file.filename
        })

        await skill.save() 
        res.status(201).json({skill})
    }catch(err){
        console.log(err)
    }
}

exports.DeleteSkill  = async (req,res)=>{
    try{
        await skillSchema.findByIdAndDelete(req.params.id)
        res.status(200).json("Skill Deleted Successfully")
    }catch(err){
        console.log(err)
    }
}

exports.GetSkills = async (req,res)=>{
    try{
        const skills = await skillSchema.find()
        res.status(200).json({skills})
    }catch(err){
        console.log(err)
    }
}
