const express = require("express")
const { CreateTool, DeleteTool, GetTools } = require("../controller/Tools")
const router = express.Router()

router.post("/createTool" ,CreateTool)
router.delete("/deleteTool/:id" ,DeleteTool)
router.get("/tools" ,GetTools)

module.exports = router