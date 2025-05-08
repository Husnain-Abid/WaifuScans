import React, { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { FaUser, FaCog, FaPatreon } from "react-icons/fa"

export default function Account() {

        const [activeTab, setActiveTab] = useState("account")
        const [userData, setUserData] = useState({
          username: "Charles",
          email: "Charlesjhon367@gmail.com",
        })
      
        const handleInputChange = (e) => {
          const { name, value } = e.target
          setUserData({
            ...userData,
            [name]: value,
          })
        }
      
        const handleUpdateAccount = (e) => {
          e.preventDefault()
          // Here you would typically send the updated data to your backend
          console.log("Account updated with:", userData)
          // Show success message or handle errors
        }
      

    return (
    <MainLayout>
    <div className=" bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                <FaUser className="text-gray-500 text-5xl" />
              </div>
              <h2 className="text-xl font-semibold">{userData.username}</h2>
              <a href="#" className="text-blue-400 text-sm hover:underline">
                View profile
              </a>
            </div>

            {/* Navigation Menu */}
            <div className="border border-gray-700 rounded-md overflow-hidden">
              <button
                className={`w-full flex items-center justify-between px-4 py-3 text-left ${
                  activeTab === "account" ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab("account")}
              >
                <div className="flex items-center">
                  <FaUser className="mr-3 text-blue-400" />
                  <span>Account</span>
                </div>
                <span className="text-gray-500">›</span>
              </button>
              <button
                className={`w-full flex items-center justify-between px-4 py-3 text-left border-t border-gray-700 ${
                  activeTab === "password" ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab("password")}
              >
                <div className="flex items-center">
                  <FaCog className="mr-3 text-blue-400" />
                  <span>Change Password</span>
                </div>
                <span className="text-gray-500">›</span>
              </button>
            </div>

            {/* Patreon Button */}
            <button className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-md flex items-center justify-center transition-colors">
              <FaPatreon className="mr-2" />
              <span className="font-bold">CONNECT YOUR PATREON</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2">
            {activeTab === "account" && (
              <div>
                <div className="flex items-center mb-6">
                  <FaUser className="text-gray-400 mr-2" />
                  <h1 className="text-xl font-semibold text-gray-400">Account</h1>
                </div>

                <form onSubmit={handleUpdateAccount}>
                  <div className="mb-6">
                    <label htmlFor="username" className="block text-gray-400 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={userData.username}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors"
                  >
                    Update Account
                  </button>
                </form>
              </div>
            )}

            {activeTab === "password" && (
              <div>
                <div className="flex items-center mb-6">
                  <FaCog className="text-gray-400 mr-2" />
                  <h1 className="text-xl font-semibold text-gray-400">Change Password</h1>
                </div>

                <form>
                  <div className="mb-6">
                    <label htmlFor="currentPassword" className="block text-gray-400 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="newPassword" className="block text-gray-400 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-400 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>



</MainLayout>
  )
}
