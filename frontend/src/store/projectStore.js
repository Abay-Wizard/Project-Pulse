import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const projectStore=create((set,get)=>({
    projects:[],
    project:{},
    isCreatingProject:false,
    isFetchingProjects:false,
    isUpdatingProject:false,
    isDeletingProject:false,

    createProject:async(data)=>{
        set({isCreatingProject:true})
        try {
           const res=await axiosInstance.post('/project/create',data)
           if(res.data.success){
            set({projects:[...get().projects,res.data.data]})
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
                const updatedProjects=get().projects.map(
                    (project)=> project._id === id ? res.data.data : project
                )
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

    updateProjectStatus:async(id,data)=>{
        try {
            const res=await axiosInstance.put(`/project/update-status/${id}`,data)
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error?.message)
            toast.error(error?.response?.data?.message)
        }
    },

    fetchProjects:async()=>{
        set({isFetchingProjects:true})
        try {
            const res=await axiosInstance.get('/project/projects')
            if(res.data.success){
                set({projects:res.data.data})
            }
        } catch (error) {
            console.log(error?.message)
            //toast.error(error?.response?.data?.message)
        }finally{
           set({isFetchingProjects:false})
        }
    },

    fetchProject:async(id)=>{
        try {
           const res=await axiosInstance.get(`/project/projects/${id}`)
           if(res.data.success){
            set({project:res.data.data})
           }
        } catch (error) {
            console.log(error?.message)
            toast.error(error?.response?.data?.message)
        }
    },

    deleteProject:async(id)=>{
        set({isDeletingProject:true})
        try {
           const res=await axiosInstance.delete(`/project/delete/${id}`)
           if(res.data.success){
            set({projects: get().projects.filter(p => p._id !== id)})
            toast.success(res.data.message)
           }
        } catch (error) {
            console.log(error?.message)
            toast.error(error?.response?.data?.message)
        }finally{
          set({isDeletingProject:false})
        }
    }
    
}))
