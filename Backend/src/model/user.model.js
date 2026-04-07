const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username: {
        type:String,
        unique: [true,"username already taken"],
        required: true
    },

    email: {
        type:String,
        unique:[true,"Account already there with this email"],
        required:true
    },

    password:{
        type:String,
        requiredL:true
    }
})

const userModel=mongoose.model("users",userSchema)
// user collection name in which whole model data is stored

module.exports=userModel