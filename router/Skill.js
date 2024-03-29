const express = require("express")
const router = express.Router()
const multer = require("multer");
const { CreateSkill, DeleteSkill, GetSkills } = require("../controller/Skill");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const Ext =  file.mimetype.split("/")[1]
      const fileName = `project-${Date.now()}.${Ext}` 
      cb(null, fileName)
    }
  })

const fileFilter = (req, file, cb)=>{
    const imageType = file.mimetype.split("/")[0]
    if(imageType == "image"){
        return  cb(null,true)
    }else{
        const error = new Error('Invalid file type. Only images are allowed.');
        error.status = 400;
        return cb(error, false);
    }
}

const upload = multer({
    storage,
    fileFilter
})

router.post("/createSkill",upload.single("photo") ,CreateSkill)
router.delete("/deleteSkill/:id" ,DeleteSkill)
router.get("/skills" ,GetSkills)

module.exports = router