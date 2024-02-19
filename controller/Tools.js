const toolSchema = require("../model/Tool")

exports.CreateTool = async (req,res)=>{
    const {name} = req.body
    try{
        const existingName = await toolSchema.findOne({name})
        if(existingName){
            return res.status(400).json("Tool is already exists")
        }
        const tool =  new toolSchema({...req.body})
        await tool.save() 
        res.status(201).json({tool})
    }catch(err){
        console.log(err)
    }
}


exports.DeleteTool  = async (req,res)=>{
    try{
        await toolSchema.findByIdAndDelete(req.params.id)
        res.status(200).json("Tool Deleted Successfully")
    }catch(err){
        console.log(err)
    }
}

exports.GetTools = async (req,res)=>{
    try{
        const tools = await toolSchema.find()
        res.status(200).json({tools})
    }catch(err){
        console.log(err)
    }
}
