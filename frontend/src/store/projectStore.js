import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const projectStore=create((set,get)=>({
    projects:[],
    isCreatingProject:false,
    isFetchingProjects:false,
    isUpdatingProject:false,
    isDeletingProject:false,
    createProject:async(data)=>{
        set({isCreatingProject:true})
        try {
           const res=await axiosInstance.post('/project/create',data)
           if(res.data.success){
            set({projects:[...get().projects,res.data.data]}) //for instant ui update
            toast.success(res.data.message)
           }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }finally{
          set({isCreatingProject:false})
        }
    },
    updateProject:async(id,data)=>{
        set({isUpdatingProject:true})
        try {
            const res=await axiosInstance.put(`/project/update/${id}`,data)
            if(res.data.success){
                const updatedProjects=get().projects.map((project)=> project._id !==id ? project : res.data.data)
                set({projects:updatedProjects})
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }finally{
           set({isUpdatingProject:false})
        }
    },
    
}))