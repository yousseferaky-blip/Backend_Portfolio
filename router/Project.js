const express = require("express")
const router = express.Router()
const multer = require("multer");
const { CreateProject, GetProjects, UpdateProject, DeleteProject, GetOneProject } = require("../controller/Project");

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

router.post("/createProject",upload.single("photo") ,CreateProject)
router.put("/update/:id" ,UpdateProject)
router.delete("/delete/:id" ,DeleteProject)
router.get("/project/:id" ,GetOneProject)
router.get("/projects" ,GetProjects)

module.exports = router