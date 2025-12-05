import { Router } from "express";
import { registerUser,loginUser,checkUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const userRouter=Router()

userRouter.post('/signup',registerUser)
userRouter.post('/signin',loginUser)
userRouter.get('/checkuser',authMiddleware,checkUser)


export default userRouter