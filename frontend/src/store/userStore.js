import {create} from 'zustand'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'
export const userStore=create((set)=>({
    user:null,
    isSigningUp:false,
    isSigningIn:false,
    signUp:async(data)=>{
      set({isSigningUp:true})
      try {
       const res=await axiosInstance.post('/user/signup',data)
       if(res.data.success){
        set({user:res.data.data})
        toast.success(res.data.message)
       }
      } catch (error) {
        console.log(error?.message)
        toast.error(error?.response?.data?.message)
      }finally{
        set({isSigningUp:false})
      }
    },
    signIn:async(data)=>{
        set({isSigningIn:true})
        try {
            const res=await axiosInstance.post('/user/signin',data)
            if(res.data.success){
                set({user:res.data.data})
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }finally{
            set({isSigningIn:false})
        }
    },
    checkUser:async()=>{
        try {
            const res=await axiosInstance.get('/user/checkuser')
            if(res.data.success){
                set({user:res.data.data})
            }
        } catch (error) {
            console.log(error?.message)
            toast.error(error?.response?.data?.message)
        }
    }
}))
