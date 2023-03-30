const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {UserModel}  = require("../model/user.model")

const userRoute = express.Router()

userRoute.post("/register",async(req,res)=>{
    const {username,email,password} = req.body

    try {
        const user = await UserModel.find({email})
        if(user){
            bcrypt.hash(password, 5, async(err, hash)=> {
                const newuser = new UserModel({username,email,password:hash})
                await newuser()
                res.status(200).send({"message":"Registeration Successfull"})
            });
        }else{
            res.status(400).send({"message":"There’s already an account with that email"})
        }
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result) =>{
                if(result){
                    res.status(400).send({"message":"Login Successfull" , token : jwt.sign({userId:user._id},'name')})
                }if (err){
                    res.status(400).send({"message":"Incorrect email or password, please try again."})
                }
            });
        }else{
            res.status(400).send({"message":"Incorrect email or password, please try again."})
        }
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})

module.exports={userRoute}