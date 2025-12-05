import React, { useState } from 'react'
import { ArrowBigRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projectStore } from '../store/projectStore'

const CreateProject = () => {
  const { createProject, isCreatingProject } = projectStore()
  const [data, setData] = useState({
    projectName: '',
    description: '',
    status: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createProject(data)
      setData({ projectName: '', description: '', status: '' })
    } catch (error) {
      console.log(error?.message)
    }
  }

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-10 border border-purple-200 grid grid-cols-1 lg:grid-cols-2 gap-10">

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-purple-700 mb-4">
            Publish Your Project
          </h1>

          <p className="text-gray-600 mb-6">
            Create and document your project so you can easily track progress, update status, and manage your work in one place.
          </p>

          <Link 
            to="/dashboard" 
            className="flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900 transition"
          >
            Go back to dashboard <ArrowBigRight size={20} />
          </Link>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="bg-purple-50 p-6 rounded-xl border border-purple-200 shadow-sm flex flex-col gap-5"
        >

          <div>
            <label className="text-sm font-semibold text-gray-700">Project Name</label>
            <input
              onChange={handleChange}
              name="projectName"
              value={data.projectName}
              type="text"
              placeholder="Enter project name"
              required
              className="w-full p-3 mt-1 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
              onChange={handleChange}
              name="description"
              value={data.description}
              rows={6}
              placeholder="Describe your project"
              required
              className="w-full p-3 mt-1 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Status</label>
            <select
              onChange={handleChange}
              name="status"
              value={data.status}
              required
              className="w-full p-3 mt-1 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="">Select status</option>
              <option value="Not started">Not started</option>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {isCreatingProject ? "Creating project..." : "Create Project"}
          </button>

        </form>

      </div>

    </div>
  )
}

export default CreateProject
