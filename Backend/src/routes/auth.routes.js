const { Router } = require("express")
const authController=require("../controllers/auth.controller")
const authMiddleware=require("../middlewares/auth.middleware")

const authRouter=Router()
/**
 *  @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register",authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login",authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description clear token frmo cookies and blacklist it
 * @access Public
 */

authRouter.get("/logout",authController.logoutUserController)

// getting detail of logged in user

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)


module.exports=authRouter