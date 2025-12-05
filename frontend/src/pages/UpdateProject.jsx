import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectStore } from "../store/projectStore";

const UpdateProject = () => {
  const { updateProject, isUpdatingProject, project, fetchProject } =
    projectStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    projectName: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    fetchProject(id);
  }, [id]);

  useEffect(() => {
    if (project?._id) {
      setData({
        projectName: project.projectName,
        description: project.description,
        status: project.status,
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProject(id, data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white border border-purple-200 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-purple-700">Update Project</h1>
        <p className="mt-1 text-gray-600">
          Keep your project details accurate and up to date.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="text-gray-700 text-sm mb-1 block">
              Project Name
            </label>
            <input
              onChange={handleChange}
              name="projectName"
              value={data.projectName}
              placeholder="Project Name"
              type="text"
              className="w-full p-3 rounded-lg border border-purple-300 bg-purple-50 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm mb-1 block">
              Description
            </label>
            <textarea
              onChange={handleChange}
              name="description"
              value={data.description}
              placeholder="Describe your project..."
              rows={5}
              className="w-full p-3 rounded-lg border border-purple-300 bg-purple-50 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm mb-1 block">
              Current Status
            </label>
            <select
              name="status"
              value={data.status}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-purple-300 bg-purple-50 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="">Select status</option>
              <option value="Not started">Not started</option>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white cursor-pointer rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            {isUpdatingProject ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;
