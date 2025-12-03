import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
const authMiddleware =async(req,res,next)=>{
    const token=req.cookies.jwt
    try {
        if(!token){
            return res.status(401).json({success:false,message:'No token is provided!'})
        }
        const decoded=jwt.verify(token,process.env.jwt_secret)
        if(!decoded){
            return res.status(401).json({success:false,message:'Invalid token!'})
        }
        const userId=decoded.id
        const user=await User.findById(userId).select('-password')
        if(!user){
            return res.status(404).json({success:false,message:'You are no longer in our database!'})
        }
        req.user=user
        next()

    } catch (error) {
        console.log(error?.message)
        res.status(500).json({success:false,message:"Internal server error!"})
    }
}

export default authMiddleware