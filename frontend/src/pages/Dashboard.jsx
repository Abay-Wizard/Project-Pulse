import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit, Trash2, PlusCircle, Loader } from 'lucide-react'
import { userStore } from '../store/userStore'
import { projectStore } from './../store/projectStore'
import dateConverter from '../lib/dateConverter'

const Dashboard = () => {
  const { user, isCheckingUser } = userStore()
  const { projects, updateProjectStatus, deleteProject, fetchProjects } = projectStore()
  const navigate = useNavigate()

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleStatusUpdate = async (e, id) => {
    const value = e.target.value
    try {
      await updateProjectStatus(id, { status: value })
      fetchProjects()
    } catch (error) {
      console.log(error?.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id)
      } catch (error) {
        console.log(error?.message)
      }
    }
  }

  if (isCheckingUser || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="flex items-center gap-2 text-purple-700 text-lg">
          <Loader className="animate-spin" size={24} />
          <span>Loading user...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-purple-50 px-6 py-10 pb-12">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-purple-700">
            Welcome back, {user.fullName}!
          </h1>
          <p className="text-gray-600 mt-1">
            Manage, track, and monitor all your projects in one place.
          </p>
        </div>

        <button
          onClick={() => navigate('/create')}
          className="mt-4 md:mt-0 flex items-center cursor-pointer gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          <PlusCircle size={20} />
          Create New Project
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-purple-200 p-6 mb-8">
        {projects.length > 0 ? (
          <p className="text-gray-700 text-lg">
            You currently have{' '}
            <span className="text-purple-700 font-bold">
              {projects.length} active projects.
            </span>
          </p>
        ) : (
          <p className="text-gray-700 text-lg">
            You have no projects yet. Start by publishing your first one!
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white border border-purple-200 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200 relative"
          >
            <div className="absolute right-4 top-4 flex items-center gap-4">
              <Edit
                size={20}
                className="cursor-pointer text-purple-600 hover:text-purple-800 transition"
                onClick={() => navigate(`/update/${project._id}`)}
              />
              <Trash2
                size={20}
                className="cursor-pointer text-red-500 hover:text-red-700 transition"
                onClick={() => handleDelete(project._id)}
              />
            </div>

            <div className="mt-2">
              <h2 className="text-xl font-bold text-purple-700 mb-2 pr-10 wrap-break-word">
                {project.projectName}
              </h2>

              <p className="text-gray-700 text-sm mb-4 wrap-break-word whitespace-pre-line">
                {project.description}
              </p>

              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600">Status:</label>
                <select
                  onChange={(e) => handleStatusUpdate(e, project._id)}
                  value={project.status}
                  className="mt-1 p-2 w-full border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="">Select status</option>
                  <option value="Not started">Not started</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <p className="text-gray-500 text-xs">
                📅 Published on {dateConverter(project.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center mt-10 text-gray-600 text-sm">
          No projects found. Start by creating your first project.
        </div>
      )}
    </div>
  )
}

export default Dashboard
