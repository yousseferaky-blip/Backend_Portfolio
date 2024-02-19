const projectSchema = require("../model/Project")

exports.CreateProject = async (req,res)=>{
    const {name} = req.body
    try{
        const existingName = await projectSchema.findOne({name})
        if(existingName){
            return res.status(400).json("Name is already exists")
        }

        const newProjectData = req.body
        const project =  new projectSchema({
            ...newProjectData,
            photo:req.file.filename
        })

        await project.save() 
        res.status(201).json({project})
    }catch(err){
        console.log(err)
    }
}

exports.UpdateProject = async (req,res)=>{
    const {name} = req.body
    try{
        const existingName = await projectSchema.findOne({name})
        if(existingName){
            return res.status(400).json("Name is already exists")
        }

        await projectSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json("Project Updated Successfully")
    }catch(err){
        console.log(err)
    }
}

exports.DeleteProject  = async (req,res)=>{
    try{
        await projectSchema.findByIdAndDelete(req.params.id)
        res.status(200).json("Project Deleted Successfully")
    }catch(err){
        console.log(err)
    }
}

exports.GetOneProject = async (req,res)=>{
    try{
        const project = await projectSchema.findById(req.params.id)
        res.status(200).json({project})
    }catch(err){
        console.log(err)
    }
}

exports.GetProjects  = async (req,res)=>{
    try{
        const projects = await projectSchema.find()
        res.status(200).json({projects})
    }catch(err){
        console.log(err)
    }
}
