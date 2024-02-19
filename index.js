const mongoose = require("mongoose")
const express = require("express")
const app = express()
require('dotenv').config()
const path = require('path');
const ProjectRoute = require("./router/Project")
const ServiceRoute = require("./router/Service")
const SkillRoute = require("./router/Skill")
const ToolRoute = require("./router/Tool")
const AuthRoute = require("./router/auth")

// CORS
const cors = require("cors")
const cookieParser = require("cookie-parser");
app.use(cors())
app.use(express.json());
app.use(cookieParser());
// IMAGE
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')))

// ROUTES
app.use("/api",ProjectRoute)
app.use("/api",ServiceRoute)
app.use("/api",SkillRoute)
app.use("/api",ToolRoute)
app.use("/api",AuthRoute)


// CONNECT
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to the database successfully!")
}).catch((error) => {
    console.error("Error connecting to the database:", error.message);
});
  

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
