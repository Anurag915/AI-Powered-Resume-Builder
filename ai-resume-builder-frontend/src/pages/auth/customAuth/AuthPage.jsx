import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { loginUser, registerUser } from "@/Services/login";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(""); // Clear error message when switching forms
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        // Sign Up Logic
        const response = await registerUser({ fullName, email, password });
        if (response.success) {
          navigate("/dashboard");
        } else {
          setError(response.message || "Sign-up failed!");
        }
      } else {
        // Sign In Logic
        const response = await loginUser({ email, password });
        if (response.success) {
          navigate("/dashboard");
        } else {
          setError(response.message || "Login failed!");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1d2b64] to-[#f8cdda] px-4">
      <motion.div
        className="relative w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-300"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Toggle Buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={toggleForm}
            className={`w-1/2 py-2 font-semibold transition duration-300 rounded-t-lg ${
              !isSignUp ? "bg-white text-gray-900" : "text-gray-300"
            }`}
          >
            <FaSignInAlt className="inline-block mr-2" />
            Sign In
          </button>
          <button
            onClick={toggleForm}
            className={`w-1/2 py-2 font-semibold transition duration-300 rounded-t-lg ${
              isSignUp ? "bg-white text-gray-900" : "text-gray-300"
            }`}
          >
            <FaUserPlus className="inline-block mr-2" />
            Sign Up
          </button>
        </div>

        {/* Form Container with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isSignUp ? "signUp" : "signIn"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-center text-white">
              {isSignUp ? "Create an Account" : "Welcome Back!"}
            </h2>
            <p className="text-sm text-center text-gray-200 mb-6">
              {isSignUp
                ? "Sign up to get started with your journey."
                : "Sign in to access your dashboard."}
            </p>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
                  <FaUser className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="bg-transparent outline-none w-full"
                  />
                </div>
              )}

              <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
                <FaUser className="text-gray-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-transparent outline-none w-full"
                />
              </div>

              <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-transparent outline-none w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 ml-2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold transition hover:scale-105"
              >
                {loading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : isSignUp ? (
                  "Register"
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-gray-300">
              {isSignUp ? "Already have an account?" : "New here?"}{" "}
              <button
                onClick={toggleForm}
                className="text-white underline font-semibold"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default AuthPage;
