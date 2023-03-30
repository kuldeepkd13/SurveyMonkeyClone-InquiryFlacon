const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
     const token = req.headers.authorization
    if(token){
        const decoded = jwt.verify(token, 'name');
        req.body.userId=decoded.userId
        next()
    }else{
      res.status(400).send({"message":"Login first"})
    }
}

module.exports={auth}