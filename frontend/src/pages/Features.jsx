import React from "react";
import { FilePlus, PenSquare, Trash2, CheckSquare } from "lucide-react";

const Features = () => {
  return (
    <div className="w-full pt-12 pb-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-purple-700">Features</h1>
        <p className="mt-3 text-gray-600 text-lg max-w-2xl mx-auto">
          ProjectPulse gives you the tools you need to manage your projects
          efficiently and stay in control.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="bg-white shadow-md rounded-xl p-6 text-center border-t-4 border-purple-600">
          <FilePlus size={50} className="mx-auto text-purple-600" />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            Publish Projects
          </h3>
          <p className="mt-2 text-gray-600 text-sm">
            Create and publish new projects instantly to keep your workflow
            organized and your progress visible.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center border-t-4 border-purple-600">
          <CheckSquare size={50} className="mx-auto text-purple-600" />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            Update Status
          </h3>
          <p className="mt-2 text-gray-600 text-sm">
            Quickly update project status using a simple dropdown — no need to
            edit the entire project.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center border-t-4 border-purple-600">
          <PenSquare size={50} className="mx-auto text-purple-600" />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            Edit Projects
          </h3>
          <p className="mt-2 text-gray-600 text-sm">
            Make full edits to project details at any time to keep information
            up to date.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center border-t-4 border-purple-600">
          <Trash2 size={50} className="mx-auto text-purple-600" />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            Delete Projects
          </h3>
          <p className="mt-2 text-gray-600 text-sm">
            Remove outdated or unnecessary projects to keep your dashboard clean
            and focused.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
