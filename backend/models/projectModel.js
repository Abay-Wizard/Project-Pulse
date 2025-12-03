import mongoose from "mongoose";
const projectSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    projectName:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    status:{
        type:String
    }
},{timestamps:true})

const Project=mongoose.model('Project',projectSchema)
export default Project