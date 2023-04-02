const express = require("express");

const {SurveyModel} = require("../model/survey.model")
const {UserModel} = require("../model/user.model")
const {QuestionModel} =require("../model/question.model")
const surveyRoute = express.Router()

surveyRoute.post("/addsurvey",async(req,res)=>{
    const payload = req.body

    try {
        const survey  = new SurveyModel(payload)
        await survey.save()
        const user = await UserModel.findById(payload.userId)
        if (user) {
          user.surveys.push(survey._id)
          user.survey_count = user.survey_count + 1;
          await user.save()
        }
        res.status(200).send({"message":"Survey Added" , survey})
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
})

surveyRoute.get("/",(req,res)=>{
    res.send("hello")
})

surveyRoute.get("/allsurvey", async (req, res) => {
    try {
      const user = await UserModel.findOne({ _id: req.body.userId }).populate("surveys");
      res.status(200).send({"data":user.surveys});
    } catch (error) {
      res.status(500).send({ message: "Error getting surveys" });
    }
  });

surveyRoute.get("/:id",async(req,res)=>{
  try {
    const data = await SurveyModel.findOne({_id:req.params.id})
    res.status(200).send({"message":"Survey data",survey:data})
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
})

surveyRoute.patch("/update/:id",async(req,res)=>{
  let id = req.params.id
  let payload = req.body
  try {
    
    const survey = await SurveyModel.findByIdAndUpdate({_id:id},payload,{new:true})
    res.status(200).send({"message":"Surveys is Updated successfully",survey})
  } catch (error) {
    res.status(400).send({ message: 'Server error', error });
  }
})
surveyRoute.delete("/delete/:id",async(req,res)=>{
  let id = req.params.id
  try {
    const survey = await SurveyModel.findByIdAndDelete({_id:id})
    const deletedQuestion = await QuestionModel.deleteMany({surveyId:id})
    res.status(200).send({"message":"Surveys is deleted successfully"})
  } catch (error) {
    res.status(400).send({ message: 'Server error', error });
  }
})
module.exports={surveyRoute}