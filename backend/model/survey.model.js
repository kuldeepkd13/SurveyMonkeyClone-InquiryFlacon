const mongoose = require("mongoose")


const surveySchema =  mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    created_date: {
      type: Date,
      default: Date.now,
      get: (val) => moment(val).format("DD-MM-YYYY")
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    type: {
      type: String,
      enum: ['quiz', 'feedback'],
      required: true
    },
    question_count: {
      type: Number,
      default: 0
    },
    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question'
    }]
  },{
    versionKey:false
  });

  const SurveyModel = mongoose.model("survey",surveySchema)

module.exports={SurveyModel}