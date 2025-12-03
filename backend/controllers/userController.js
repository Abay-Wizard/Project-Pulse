import User from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import generateToken from "../lib/generateToken.js";

const registerUser=async(req,res)=>{
    const {fullName,email,password} =req.body
    try {
        if(!fullName ||!email ||!password){
            return res.status(401).json({success:false,message:"You need fullName, email and password to register!"})
        }
        const exists=await User.findOne({email})
        if(exists){
            return res.status(401).json({success:false,message:'Email already exists!'})
        }

        if(password.length < 8){
            return res.status(401).json({success:false,message:"Your password should at least be 8 characters long!"})
        }

        if(!validator.isEmail(email)){
            return res.status(401).json({success:false, message:'Please enter a valid email address!'})
        }
       
        const salt =await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser =new User({
            fullName,
            email,
            password:hashedPassword
            
        })

        await newUser.save()
        await generateToken(newUser._id,res)
        res.status(201).json({success:true,message:'User registered successfully!',data:newUser})

    } catch (error) {
        console.log(error?.message)
        res.status(500).json({success:false,message:'Internal server error!'})
    }
}

const loginUser=async(req,res)=>{
    const {email,password} =req.body
    try {
        if(!email ||!password){
            return res.status(401).json({success:false,message:'You need an email and password to login!'})
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({success:false,message:'Invalid email or password!'})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(403).json({success:false,message:'Invalid password or email'})
        }
        await generateToken(user._id,res)
        res.status(201).json({success:true,message:'Login successfull!',data:user})
    } catch (error) {
       console.log(error?.message)
       res.status(500).json({success:false,message:'Internal server error!'})
    }
}

const checkUser=async(req,res)=>{
    const user=req.user
    try {
        if(!user){
            return res.status(404).json({success:false,message:'User not found!'})
        }
        res.status(200).json({success:true,message:'User fetched successfully!',data:user})
    } catch (error) {
        console.log(error?.message)
        res.status(500).json({success:false,message:'Internal server error!'})
    }
}

export {registerUser,loginUser,checkUser}