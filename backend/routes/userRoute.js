import { Router } from "express";
import { registerUser,loginUser,checkUser } from "../controllers/userController.js";
const userRouter=Router()

userRouter.post('/signup',registerUser)
userRouter.post('/signin',loginUser)
userRouter.get('/checkuser',checkUser)


export default userRouter