const serviceSchema = require("../model/Service")

exports.CreateService = async (req,res)=>{
    const {name} = req.body
    try{
        const existingName = await serviceSchema.findOne({name})
        if(existingName){
            return res.status(400).json("Name is already exists")
        }

        const newServiceData = req.body
        const service =  new serviceSchema({
            ...newServiceData,
            photo:req.file.filename
        })

        await service.save() 
        res.status(201).json({service})
    }catch(err){
        console.log(err)
    }
}

exports.UpdateService = async (req,res)=>{
    const {name} = req.body
    try{
        const existingName = await serviceSchema.findOne({name})
        if(existingName){
            return res.status(400).json("Name is already exists")
        }

        await serviceSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json("Project Updated Successfully")
    }catch(err){
        console.log(err)
    }
}

exports.DeleteService  = async (req,res)=>{
    try{
        await serviceSchema.findByIdAndDelete(req.params.id)
        res.status(200).json("Project Deleted Successfully")
    }catch(err){
        console.log(err)
    }
}

exports.GetServices = async (req,res)=>{
    try{
        const services = await serviceSchema.find()
        res.status(200).json({services})
    }catch(err){
        console.log(err)
    }
}
