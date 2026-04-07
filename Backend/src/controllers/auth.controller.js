const userModel = require ("../model/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const tokenBlacklistModel = require("../model/blacklist.model")
/**
 *  @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

async function registerUserController(req, res) {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, password, email"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {  
        return res.status(400).json({
            message: "Account already registered with these details!"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    })

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
/**
 * @name loginUserController
 * @description login a user, expects email, password in req body
 * @access Public
 */

async function loginUserController(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({  // ✅ add return here too
                message: "Invalid email"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        })

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function logoutUserController(req,res) {
    const token= req.cookies.token

    if(token) {
        await tokenBlacklistModel.create({token})

        res.clearCookie("token")

        res.status(200).json({
            message:"user logged out successful"
        })
    }
}

async function getMeController(req,res) {
    const user=await userModel.findById(req.user.id)

    res.status(200).json({
        message:"User details fetched!",
        user: {
            id:user._id,
            username: user.username,
            email: user.email
        }
    })

}

module.exports= {
    registerUserController,loginUserController,logoutUserController
    ,getMeController    
}