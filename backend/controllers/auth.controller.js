const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const generateJWT = require("../utils/generateJWT");

const signupUser = async (req, res) => {
    let success = false;
    try{
        const {fullName, username, email, password, confirmPassword, gender} = req.body;
        if(password !== confirmPassword) {
            return res.status(400).json({success,message: "Password and confirmPassword do not match"})
        }
        const user = await User.findOne({username})
        if(user) {
            return res.status(400).json({success,message: "Username already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara/public/girl?username=${username}`
        const newUser = new User({fullName, username, email, password: hashedPassword,gender, profilePic:gender==='male'?boyProfilePic:girlProfilePic}) 
        generateJWT(newUser._id,res)  
        const result = await newUser.save()
        success = true;
        res.status(201).json({
            success,
            _id: result._id,
            fullName: result.fullName,
            username: result.username,
            profilePic: result.profilePic,
        })
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({success,message: "Something went wrong"})
    }
}
const loginUser = async (req, res) => {
    res.send('loginUser')
    console.log('loginUser')
};

const logoutUser = async (req, res) => {
    res.send('logoutUser')
    console.log('logoutUser')
}

module.exports = { loginUser, signupUser, logoutUser };