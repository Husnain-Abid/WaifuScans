import React, { useEffect, useState } from 'react'
import { RiAccountCircle2Line, RiLogoutCircleRLine } from "react-icons/ri"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import axios from 'axios'
import { BASE_URL } from '../../utils/apiURL'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [settings, setSettings] = useState(null)

  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/settings`) // adjust path if needed
        setSettings(res.data)
      } catch (error) {
        console.error("Failed to fetch website settings:", error)
      }
    }

    fetchSettings()
  }, [])


  console.log(user);


  return (
    <nav className="bg-black text-white py-3 px-4 flex items-center justify-between">
      <div className='flex gap-20'>

        <div className='flex items-center gap-2'>
          {/* user */}

          {user &&
            <div className="flex items-center">
              <Link to="/">
                <img
                  src={user.profile || "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
                  alt="profile" className='w-8 rounded-full border-2' />
              </Link>
            </div>
          }








          {/* Logo  */}
          <div className="rounded-lg cursor-pointer">
            <Link to="/" className="font-poppins text-2xl font-bold text-center ">
              <span className="text-white/70">Waifu</span>
              <span className="bg-yellow-600 text-black rounded ">Scans</span>
              <span className="text-white/70">418</span>
            </Link>
          </div>
        </div>



        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 mx-auto">
          <Link to="/" className="flex items-center">Home</Link>
          <Link to="/commissions" className="flex items-center">Commissions</Link>

          <Link to={settings?.patreon || "https://www.patreon.com/WaifuScans418"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            {/* <FaPatreon /> */}
            Patreon
          </Link>
          <Link to={settings?.twitter || "https://x.com/WaifuScans418"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            {/* <RiTwitterXFill /> */}
            Twitter
          </Link>
          <Link to={settings?.instagram || "https://www.instagram.com/waifuscans418"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            {/* <FaInstagram /> */}
            Instagram
          </Link>

        </div>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-black z-50 md:hidden">
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link to="/" className="flex items-center">Home</Link>
            <Link to="/commissions" className="flex items-center">Commissions</Link>

            <Link to={settings?.patreon || "https://www.patreon.com/WaifuScans418"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              {/* <FaPatreon /> */}
              Patreon
            </Link>
            <Link to={settings?.twitter || "https://x.com/WaifuScans418"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              {/* <RiTwitterXFill /> */}
              Twitter
            </Link>
            <Link to={settings?.instagram || "https://www.instagram.com/waifuscans418"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              {/* <FaInstagram /> */}
              Instagram
            </Link>


            <div className="flex items-center space-x-4 pt-2">
              {!user ? (
                <>
                  <Link to="/login" className="flex items-center">Login</Link>
                  <Link to="/register" className="flex items-center">Register</Link>
                </>
              ) : (
                <>
                  <Link to="/account" className="flex items-center">
                    <RiAccountCircle2Line className="mr-1" />
                    Account
                  </Link>
                  <button className="flex items-center gap-1" onClick={handleLogout}>
                    <RiLogoutCircleRLine className="mr-1" />
                    Logout
                  </button>
                </>
              )}
            </div>


          </div>
        </div>
      )}

      {/* Desktop User & Social Icons */}
      <div className="hidden md:flex items-center space-x-10">
        <div className="flex items-center space-x-6 mr-20">
          {!user ? (
            <>
              <Link to="/login" className="flex items-center gap-1">Login</Link>
              <Link to="/register" className="flex items-center gap-1">Register</Link>
            </>
          ) : (
            <>
              <Link to="/account" className="flex items-center gap-1">
                <RiAccountCircle2Line size={22} />
                Account
              </Link>
              <button className="flex items-center gap-1" onClick={handleLogout}>
                <RiLogoutCircleRLine size={20} />
                Logout
              </button>
            </>
          )}
        </div>

        {/* <div className="flex items-center space-x-4">
          <a href="https://x.com/WaifuScans418" target="_blank" rel="noopener noreferrer" className="text-xl">
            <RiTwitterXFill />
          </a>
          <a href="https://www.instagram.com/waifuscans418/" target="_blank" rel="noopener noreferrer" className="text-xl">
            <FaInstagram />
          </a>
          <a href="https://www.patreon.com/WaifuScans418" target="_blank" rel="noopener noreferrer" className="text-xl">
            <FaPatreon />
          </a>
        </div> */}
      </div>
    </nav>
  )
}
