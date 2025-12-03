import { Router } from "express";
import { createProject,getProjects,getSingleProject,deleteProject,updateProject,updateProjectStatus } from "../controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const projectRouter=Router()

projectRouter.post('/create',authMiddleware,createProject)
projectRouter.put('/update/:id',authMiddleware,updateProject)
projectRouter.put('/update-status/:id',authMiddleware,updateProjectStatus)
projectRouter.get('/projects',authMiddleware,getProjects)
projectRouter.get('/projects/:id',authMiddleware,getSingleProject)
projectRouter.delete('/delete/:id',authMiddleware,deleteProject)


export default projectRouter