const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
  username:String,  
  email:String,
  password:String,
  survey_count: {
    type: Number,
    default: 0
  },
  surveys: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'survey'
  }]
},{
  versionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports={UserModel}