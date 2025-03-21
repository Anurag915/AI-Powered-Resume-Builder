import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      setMessage("Thank you for your feedback!");
      setFeedback("");
    } else {
      setMessage("Please enter your feedback.");
    }
  };

  return (
    <footer className="w-full bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">
        {/* Left Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-bold">AI Resume Builder</h3>
          <p className="text-sm text-gray-400 mt-2">&copy; 2024 All rights reserved.</p>
          <div className="flex space-x-4 mt-3">
            <a href="https://github.com/Anurag915" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-400 hover:text-white transition transform hover:scale-110" size={24} />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-400 hover:text-white transition transform hover:scale-110" size={24} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-400 hover:text-white transition transform hover:scale-110" size={24} />
            </a>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-bold">We Value Your Feedback</h3>
          <form onSubmit={handleSubmit} className="mt-3">
            <textarea
              className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:border-blue-400"
              placeholder="Let us know your thoughts..."
              rows="3"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-md"
            >
              Submit
            </button>
          </form>
          {message && <p className="mt-2 text-sm text-green-400">{message}</p>}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
