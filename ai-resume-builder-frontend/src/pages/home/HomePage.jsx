import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode === 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.log("Error in HomePage:", error.message);
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  const handleGetStartedClick = () => {
    user ? navigate("/dashboard") : navigate("/auth/sign-in");
  };

  return (
    <>
      <Header user={user} />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-4xl px-6">
          <h1 className="text-6xl font-extrabold">
            Create Your AI-Powered <span className="text-yellow-300">Resume</span> Instantly!
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Leverage AI to craft a professional resume tailored for your dream job.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-500 transition-all"
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
            <a
              href="https://github.com/Anurag915"
              target="_blank"
              className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-all"
              rel="noopener noreferrer"
            >
              <FaGithub className="mr-2" /> Learn More
            </a>
          </div>
        </div>
        <div className="mt-12 max-w-3xl">
          <img
            className="rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105 border-4 border-yellow-300"
            src={heroSnapshot}
            alt="Resume Builder Preview"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">Why Choose AI Resume Builder?</h2>
          <p className="mt-4 text-lg text-gray-600">Powerful features to help you land your dream job.</p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">AI-Powered Suggestions</h3>
              <p className="mt-2 text-gray-600">Get personalized resume suggestions based on your skills.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">Customizable Templates</h3>
              <p className="mt-2 text-gray-600">Choose from a variety of sleek and modern templates.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">Instant Download</h3>
              <p className="mt-2 text-gray-600">Download your resume in PDF format instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">
          {/* Left Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-bold">AI Resume Builder</h3>
            <p className="text-sm text-gray-400 mt-2">&copy; 2024 All rights reserved.</p>
            <div className="flex space-x-4 mt-3">
              <a href="https://github.com/Anurag915" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-gray-400 hover:text-white transition transform hover:scale-110" size={24} />
              </a>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="w-full md:w-1/2">
            <h3 className="text-lg font-bold">We Value Your Feedback</h3>
            <form className="mt-3">
              <textarea
                className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:border-blue-400"
                placeholder="Let us know your thoughts..."
                rows="3"
              ></textarea>
              <button
                type="submit"
                className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
