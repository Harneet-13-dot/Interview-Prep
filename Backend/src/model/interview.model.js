const mongoose=require('mongoose')
/**
 * (requirement)
 * job desc schema 
 * resume text
 * Self desc
 * match number 
 * 
 * (will provide)
 * Technical que -> ques intension & ans
 * Behavioral ques -> same as above
 * skill gaps -> skill , severity(can be learned & in no. of days)
 * prep plan -> days focus tasks
 */

const technicalQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical ques is req"]
    },
    intention:{
        type:String,
        required:[true,"Intention is req"]
    },
    answer:{
        type:String,
        required:[true,"Answer is req"]
    },
},{
    _id:false     
})

const behavioralQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical ques is req"]
    },
    intention:{
        type:String,
        required:[true,"Intention is req"]
    },
    answer:{
        type:String,
        required:[true,"Answer is req"]
    },
},{
    _id:false     
})

const skillGapSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"skills are req"]
    },

    severity:{
        type:String,
        enum: ['low','medium','high'],
        required:[true,'severity is req']
    },
},{
    _id:false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "days are req"]
    },
    focus: {
        type: String,
        required: [true, "focus is required"]
    },
    tasks: {
        type: [String],  // ✅ Array of strings
        required: [true, "tasks are req"]
    }
}, { _id: false }) 

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Job desc is required!"]
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type:Number,
        min: 0,
        max: 100,
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    title:{
        type:String,
        required:[true,"job title is required"]
    }
},{
    timestamps:true
})


const interviewReportModel=mongoose.model("InterviewReport",interviewReportSchema)

module.exports = interviewReportModel;