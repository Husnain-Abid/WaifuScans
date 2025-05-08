"use client"

import { useState } from "react"
import { FaEye, FaEyeSlash, FaLock, FaPatreon } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { Link } from "react-router-dom"
import MainLayout from "../../layouts/MainLayout"

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [keepSignedIn, setKeepSignedIn] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Login submitted:", formData, "Keep signed in:", keepSignedIn)
    }

    return (
        <MainLayout>
            <div className="min-h-[80vh] flex justify-center items-center p-4">
                <div className="relative w-full max-w-xl mx-auto">
                    {/* Modal */}
                    <div className="bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden">
                        {/* Top Border */}
                        <div className="h-2 bg-[#b8b5ff]"></div>

                        <div className="p-8">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#b8b5ff] mb-8">
                                LOGIN
                            </h2>

                            <form onSubmit={handleSubmit}>
                                {/* Email */}
                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 left-0 flex items-center text-gray-400">
                                        <MdEmail />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="E-mail Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full text-sm sm:text-base md:text-lg bg-transparent border-b border-[#b8b5ff] py-2 pl-6 pr-3 text-white focus:outline-none"
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 left-0 flex items-center text-gray-400">
                                        <FaLock />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full text-sm sm:text-base md:text-lg bg-transparent border-b border-[#b8b5ff] py-2 pl-6 pr-10 text-white focus:outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center text-gray-400"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                {/* Keep Me Signed In + Forgot Password */}
                                <div className="flex items-center justify-between mb-6">
                                    <label className="flex items-center text-gray-400 text-sm sm:text-base">
                                        <input
                                            type="checkbox"
                                            checked={keepSignedIn}
                                            onChange={() => setKeepSignedIn(!keepSignedIn)}
                                            className="mr-2 h-4 w-4 accent-[#b8b5ff]"
                                        />
                                        Keep me signed in
                                    </label>

                                    <Link
                                        to="/forgot-password"
                                        className="text-[#b8b5ff] text-sm sm:text-base hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#b8b5ff] hover:bg-[#a5a1ff] text-[#1a1a2e] font-bold py-3 rounded-md mb-4 transition-colors text-sm sm:text-base md:text-lg"
                                >
                                    Login
                                </button>

                                <div className="text-center text-gray-400 mb-4 text-sm sm:text-base">
                                    or
                                </div>

                                {/* Patreon Button */}
                                <button
                                    type="button"
                                    className="w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-bold py-3 rounded-md flex items-center justify-center text-sm sm:text-base md:text-lg"
                                >
                                    <FaPatreon className="mr-2" />
                                    LOG IN WITH PATREON
                                </button>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="bg-[#b8b5ff] py-4 px-8 text-center">
                            <p className="text-[#1a1a2e] text-sm sm:text-base">
                                Not a member?{" "}
                                <Link
                                    to="/register"
                                    className="text-[#3a3a8c] font-bold hover:underline"
                                >
                                    Register Here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Login
