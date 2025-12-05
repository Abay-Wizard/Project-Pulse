import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { userStore } from "../store/userStore";

const SignIn = () => {
  const { signIn, isSigningIn } = userStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
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
      await signIn(data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl border border-purple-200 grid md:grid-cols-2">
        <div className="bg-linear-to-br from-purple-600 to-purple-800 text-white p-10 rounded-l-2xl hidden md:flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-4">
            Welcome Back to ProjectPulse
          </h1>

          <p className="text-purple-100 mb-6 text-lg max-w-md">
            Manage, track, and organize your projects in a beautiful and
            efficient workspace.
          </p>

          <ul className="space-y-3 text-purple-100 text-sm">
            <li>✔ Track ongoing and completed projects</li>
            <li>✔ Update status instantly without full edits</li>
            <li>✔ Keep your workflow organized and clean</li>
          </ul>
        </div>

        <div className="p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-purple-700">
                Sign In
              </h1>
              <p className="text-gray-600 mt-2">
                Continue your journey with{" "}
                <span className="font-semibold">ProjectPulse</span>
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Email Address"
                value={data.email}
                required
                className="p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
              />

              <div className="flex items-center p-3 border border-purple-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-600">
                <input
                  onChange={handleChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={data.password}
                  required
                  className="flex-1 outline-none"
                />
                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer text-gray-500"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer text-gray-500"
                  />
                )}
              </div>

              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer font-semibold py-3 rounded-lg transition duration-200"
              >
                {isSigningIn ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?{" "}
              <span
                className="text-purple-700 font-semibold cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Create Account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
