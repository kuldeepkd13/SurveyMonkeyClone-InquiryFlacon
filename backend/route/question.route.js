const express = require("express");

const {SurveyModel} = require("../model/survey.model")
const {UserModel} = require("../model/user.model")
const {QuestionModel} = require("../model/question.model")


const questionRoute = express.Router()


questionRoute.post('/addquestion', async (req, res) => {
    try {
      const { surveyId, questionText, questionType, options } = req.body;
      const survey = await SurveyModel.findById(surveyId);
  
      if (!survey) {
        return res.status(404).send({ message: 'Survey not found' });
      }
  
      const question = new QuestionModel({
        surveyId,
        question_text: questionText,
        question_type: questionType,
        options: options,
      });
  
      await question.save();
      survey.questions.push(question._id);
      survey.question_count += 1;
      await survey.save();
  
      res.status(200).send({
        message: 'Question added to survey successfully',
        question: question,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    }
  })



questionRoute.get("/allquestion/:surveyId", async (req, res) => {
     const surveyId =req.params.surveyId
    try {
      const user = await SurveyModel.findOne({ _id: surveyId }).populate("questions");
      if(!user){
        res.status(400).send({"message":"No Question Added , Please add Question"});
      }else{
        res.status(200).send({"data":user.questions});
      }
    } catch (error) {
      res.status(400).send({ message: "Error getting questions" });
    }
  });

module.exports={questionRoute}