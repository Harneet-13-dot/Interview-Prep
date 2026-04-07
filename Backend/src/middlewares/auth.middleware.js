const jwt= require("jsonwebtoken")
const tokenBlacklistModel=require("../model/blacklist.model")
async function authUser(req,res,next) {
    const token = req.cookies.token
    if(!token) {
        return res.status(401).json({
            message: "token not provided"
        })
    }
    const isTokenBlacklisted=await tokenBlacklistModel.findOne({
        token
    })
    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"token invalid"
        })
    }
    try {
        const decoded=jwt.verify(token , process.env.JWT_SECRET)

        req.user=decoded //stored data

        next()
    }
    catch(err) {
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

module.exports={
    authUser
}