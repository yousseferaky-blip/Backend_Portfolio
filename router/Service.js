const express = require("express")
const router = express.Router()
const multer = require("multer");
const { CreateService, UpdateService, DeleteService, GetServices } = require("../controller/Service");

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

router.post("/createService",upload.single("photo") ,CreateService)
router.put("/updateService/:id" ,UpdateService)
router.delete("/deleteService/:id" ,DeleteService)
router.get("/services" ,GetServices)

module.exports = router