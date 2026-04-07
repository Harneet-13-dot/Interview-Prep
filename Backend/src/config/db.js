const { default: mongoose } = require("mongoose")
const mogoose=require("mongoose")

async function connectToDb() {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect to db!")
    }
    catch(err){
        console.log(err)
    }
}


module.exports=connectToDb