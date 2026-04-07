const express=require('express')
const authMiddleware=require('../middlewares/auth.middleware')
const interviewController=require("../controllers/interview.controller")

const upload=require("../middlewares/file.middleware")

const interviewRouter=express.Router()


interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterViewReportController)

// get report by id(interview)

interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)

// get all reports of logged in user

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportsController)

// generating pdf of resume ai generated

interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleware.authUser,interviewController.generateResumePdfController)

module.exports=interviewRouter