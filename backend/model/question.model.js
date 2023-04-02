const mongoose = require("mongoose")

const questionSchema =  mongoose.Schema({
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'survey',
      required: true
    },
    question_text: {
      type: String,
      required: true
    },
    question_type: {
      type: String,
      enum: ['mcq', 'open'],
      required: true
    },
    options: {
      type: [String]
    }
  },{
    versionKey:false
  });


  const QuestionModel = mongoose.model("question", questionSchema)

  module.exports={QuestionModel}


