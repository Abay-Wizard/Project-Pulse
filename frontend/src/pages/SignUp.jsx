import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { userStore } from "../store/userStore";

const SignUp = () => {
  const { signUp, isSigningUp } = userStore();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res= await signUp(data);
      if(res){
        navigate("/signin");
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl border border-purple-200 grid md:grid-cols-2">
        <div className="bg-purple-600 text-white p-10 rounded-l-2xl flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold leading-tight mb-4">
            Start Managing Projects Smarter.
          </h1>

          <p className="text-purple-100 mb-6 text-lg">
            Join <span className="font-semibold">ProjectPulse</span> today and
            build your own secure dashboard to track, manage, and optimize your
            workflow with ease.
          </p>

          <ul className="space-y-3 text-purple-100 text-sm">
            <li>✔ Publish and organize your projects</li>
            <li>✔ Update project status in seconds</li>
            <li>✔ Edit and refine project details anytime</li>
            <li>✔ Delete completed or irrelevant projects</li>
          </ul>
        </div>

        <div className="p-10">
          <h2 className="text-3xl font-bold text-purple-700 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 mb-8">
            Your productivity dashboard awaits.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              onChange={handleChange}
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={data.fullName}
              required
              className="p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email Address"
              value={data.email}
              required
              className="p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <div className="flex items-center p-3 border border-purple-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-500">
              <input
                onChange={handleChange}
                name="password"
                type={isPasswordShown ? "text" : "password"}
                placeholder="Password"
                value={data.password}
                required
                className="flex-1 outline-none"
              />
              {isPasswordShown ? (
                <EyeOff
                  onClick={() => setIsPasswordShown((prev) => !prev)}
                  className="cursor-pointer text-gray-500"
                />
              ) : (
                <Eye
                  onClick={() => setIsPasswordShown((prev) => !prev)}
                  className="cursor-pointer text-gray-500"
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer font-semibold py-3 rounded-lg transition duration-200"
            >
              {isSigningUp ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-purple-700 font-semibold cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
