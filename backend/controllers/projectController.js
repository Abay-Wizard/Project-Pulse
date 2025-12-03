import Project from "../models/projectModel.js";
const createProject = async (req, res) => {
    try {
        const { projectName, description, status } = req.body;

        const userId = req.user?._id;

        if (!projectName || !description || !status) {
            return res.status(400).json({
                success: false,
                message: "projectName, description, and status are required!",
            });
        }

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No user found!",
            });
        }

        const newProject = new Project({
            projectName,
            description,
            status,
            userId: userId,
        });

        await newProject.save();

        res.status(201).json({
            success: true,
            message: "Project published successfully!",
            data: newProject,
        });
    } catch (error) {
        console.log(error?.message);
        res.status(500).json({
            success: false,
            message: "Internal server error!",
        });
    }
};


const updateProject = async (req, res) => {
    const { projectName, description, status } = req.body
    const { id } = req.params
    try {
        const project = await Project.findById(id)
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found!' })
        }
        const updatedProject = await Project.findByIdAndUpdate(id, { projectName, description, status }, { new: true })
        res.status(201).json({ success: true, message: 'Project updated successfully!', data: updatedProject })
    } catch (error) {
        console.log(error?.message)
        res.status(500).json({ success: false, message: "Internal server error!" })
    }
}

const updateProjectStatus = async (req, res) => {
    const { status } = req.body
    const { id } = req.params
    try {
        if (!status) {
            return res.status(400).json({ success: false, message: 'You need status to update project-status!' })
        }
        const updatedProject = await Project.findByIdAndUpdate(id, { status: status }, { new: true })
        if (!updatedProject) {
            return res.status(401).json({ success: false, message: 'Updating project failed!' })
        }
        res.status(201).json({ success: true, message: 'Project updated successfully!', data: updatedProject })
    } catch (error) {
        console.log(error?.message)
        res.status(500).json({ success: false, message: 'Internal server error!' })
    }
}


const getProjects = async (req, res) => {
    const userId = req.user._id
    try {
        const projects = await Project.find({ userId: userId })
        if (!projects.length) {
            return res.status(404).json({ success: false, message: "Projects not found!" })
        }
        res.status(200).json({ success: true, message: 'Projects fetched successfully!', data: projects })
    } catch (error) {
        console.log(error?.message)
        res.status(500).json({ success: false, message: 'Internal server error!' })
    }
}

const getSingleProject = async (req, res) => {
    const { id } = req.params
    try {
        const project = await Project.findById(id)
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found!' })
        }
        res.status(200).json({ success: true, message: 'Project fetched successfully!', data: project })
    } catch (error) {
        console.log(error?.message)
        res.status(500).json({ success: false, message: 'Internal server error!' })
    }
}

const deleteProject = async (req, res) => {
    const { id } = req.params
    try {
        const project = await Project.findById(id)
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found!' })
        }
        await Project.findOneAndDelete(id)
        res.status(201).json({ success: true, message: 'Project deleted successfully!' })
    } catch (error) {
        console.log(error?.message)
        res.status(500).json({ success: false, message: 'Internal server error!' })
    }
}




export { createProject, updateProject, getProjects, getSingleProject, deleteProject, updateProjectStatus }