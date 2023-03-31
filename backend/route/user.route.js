const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {UserModel}  = require("../model/user.model")

const userRoute = express.Router()

userRoute.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
  
    // Regular expression to validate password
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        if (passwordRegex.test(password)) {
          bcrypt.hash(password, 5, async (err, hash) => {
            const newUser = new UserModel({ username, email, password: hash });
            await newUser.save();
            res.status(200).send({ message: "Registration successful" });
          });
        } else {
          res
            .status(400)
            .send({
              message:
                "Password should have a minimum length of 8 and contain at least one uppercase letter, one symbol, and one number",
            });
        }
      } else {
        res.status(400).send({ message: "There’s already an account with that email" });
      }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result) =>{
                if(result){
                    res.status(200).send({"message":"Login Successfull" ,user, token : jwt.sign({userId:user._id},'name')})
                }if (err || !result){
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