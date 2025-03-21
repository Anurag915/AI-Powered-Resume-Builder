import { SignIn } from "@clerk/clerk-react";
import React from "react";

function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Sign in to access your dashboard
        </p>
        <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;
