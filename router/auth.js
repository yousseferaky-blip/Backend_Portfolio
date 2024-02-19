const express = require("express");
const { SignIn, LogOut, Refetch, Signup } = require("../controller/auth");
const router = express.Router();

router.post("/register", Signup);
router.post("/login", SignIn);
router.get("/logout", LogOut);
router.get("/refetch", Refetch);

module.exports = router;