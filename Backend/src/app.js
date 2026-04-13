const express=require('express')
const cookieParser = require("cookie-parser")
const cors=require("cors")

const app=express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    //origin:"http://localhost:5173",
    origin:"https://interview-prep-frontend-ytn0.onrender.com",
    credentials:true
}))


app.post("/test-cookie", (req, res) => {
    res.cookie("test", "hello", {
        httpOnly: true,
        secure: false,
        sameSite: "Lax"
    })
    res.json({ message: "cookie set" })
})


// require all the routes here
const authRouter=require("./routes/auth.routes")
const interviewRouter=require("./routes/interview.routes")

// prefix for using the apis
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)

module.exports=app