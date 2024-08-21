const express =require("express");
const { registerUser, loginUser, logout, getAllUser } = require("../controller/AuthController");
const router = express.Router();




router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/",logout)
router.get("/",getAllUser)

module.exports = router;