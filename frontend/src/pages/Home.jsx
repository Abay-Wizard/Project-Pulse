import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, ClipboardCheck, Users } from "lucide-react";
import { userStore } from "../store/userStore";

const Home = () => {
  const { user } = userStore();
  return (
    <div className="w-full">
      <section className="w-full bg-purple-600 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
            Manage Projects With Confidence
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-purple-200 max-w-2xl mx-auto">
            ProjectPulse helps teams stay aligned, track progress, and deliver
            results efficiently — all in one place.
          </p>

          <Link
            to={user ? "/dashboard" : "/signin"}
            className="mt-8 inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-purple-100 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-center text-3xl font-bold text-purple-700">
          Why Choose ProjectPulse?
        </h2>

        <div className="grid sm:grid-cols-3 gap-10 mt-12">
          <div className="flex flex-col items-center text-center">
            <BarChart3 size={50} className="text-purple-600" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              Track Progress
            </h3>
            <p className="mt-2 text-gray-600">
              Monitor your project milestones and stay updated in real-time.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <ClipboardCheck size={50} className="text-purple-600" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              Manage Tasks
            </h3>
            <p className="mt-2 text-gray-600">
              Organize tasks, set priorities, and keep work flowing
              effortlessly.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Users size={50} className="text-purple-600" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              Collaborate Easily
            </h3>
            <p className="mt-2 text-gray-600">
              Work together with your team using powerful collaboration tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
