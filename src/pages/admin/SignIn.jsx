import React from "react";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Signin</h1>

        <form className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-sm text-gray-700">
              Email address:
            </label>
            <input
              type="email"
              id="email"
              placeholder="esteban_schiller@gmail.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="font-medium text-sm text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm text-gray-500 hover:text-indigo-500 hover:underline">
                Forget Password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              placeholder="••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition duration-200"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
};

export default SignIn;
