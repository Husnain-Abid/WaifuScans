"use client"

import { useState } from "react"
import { FaUser, FaEye, FaEyeSlash, FaLock, FaPatreon } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import MainLayout from "../../layouts/MainLayout"
import axios from "axios"
import {BASE_URL} from "../../utils/apiURL"

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // for disabling button

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToPolicy, setAgreeToPolicy] = useState(false)
  const [showPolicy, setShowPolicy] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!agreeToPolicy) {
      validationErrors.agreeToPolicy = "You must agree to the privacy policy";
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true); // disable button
      setErrors({});

      const response = await axios.post(`${BASE_URL}/auth/register`, formData);

      toast.success(response.data.message);
      navigate("/login");
      
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };



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
                REGISTER
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 flex items-center text-gray-400">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full text-sm sm:text-base md:text-lg bg-transparent border-b border-[#b8b5ff] py-2 pl-6 pr-3 text-white focus:outline-none"
                    required
                  />
                </div>

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

                {/* Confirm Password */}
                <div className="relative mb-8">
                  <div className="absolute inset-y-0 left-0 flex items-center text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full text-sm sm:text-base md:text-lg bg-transparent border-b border-[#b8b5ff] py-2 pl-6 pr-10 text-white focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
{errors.confirmPassword && (
  <p className="text-red-500 text-sm mt-1 text-center">{errors.confirmPassword}</p>
)}

                {/* Privacy Policy */}
                <div className="mb-6">
                  <button
                    type="button"
                    className="text-[#b8b5ff] hover:underline mb-2 text-sm sm:text-base"
                    onClick={() => setShowPolicy(!showPolicy)}
                  >
                    Show privacy policy
                  </button>

                  {showPolicy && (
                    <div className="bg-gray-800 p-4 rounded-md mb-4 text-sm sm:text-base text-gray-300">
                      <p>
                        Our privacy policy outlines how we collect, use, and
                        protect your personal information. By registering, you
                        agree to our terms and conditions.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="agreePolicy"
                      checked={agreeToPolicy}
                      onChange={() => setAgreeToPolicy(!agreeToPolicy)}
                      className="mr-2 h-4 w-4 accent-[#b8b5ff]"
                    />
                    <label
                      htmlFor="agreePolicy"
                      className="text-gray-400 text-sm sm:text-base"
                    >
                      Please confirm that you agree to our privacy policy
                    </label>
                  </div>
                  {errors.agreeToPolicy && (
  <p className="text-red-500 text-sm mt-1 text-center">{errors.agreeToPolicy}</p>
)}

                </div>

                {/* Register Button */}


                <button
                  type="submit"
                  disabled={!agreeToPolicy || isSubmitting}
                  className={`w-full ${!agreeToPolicy || isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#b8b5ff] hover:bg-[#a5a1ff]"
                    } text-[#1a1a2e] font-bold py-3 rounded-md mb-4 transition-colors text-sm sm:text-base md:text-lg`}
                >
                  {isSubmitting ? "Registering..." : "Register"}
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
                Already a member?{" "}
                <Link
                  to="/login"
                  className="text-[#3a3a8c] font-bold hover:underline"
                >
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Register
