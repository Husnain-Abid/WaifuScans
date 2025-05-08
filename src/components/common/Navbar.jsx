import React, { useState } from 'react'
import logo from "../../assets/logo.jpg"
import { FaInstagram } from "react-icons/fa"
import { FaPatreon } from "react-icons/fa6"
import { RiAccountCircle2Line, RiLogoutCircleRLine, RiTwitterXFill } from "react-icons/ri"
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null) // null = not logged in

  const handleLogout = () => {
    console.log("logout")
    setUser(null) // Simulate logout
  }

  return (
    <nav className="bg-black text-white py-3 px-4 flex items-center justify-between">
      <div className='flex gap-20'>
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="logo" className='w-40' />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 mx-auto">
          <Link to="/" className="flex items-center">Home</Link>
          <Link to="/commissions" className="flex items-center">Commissions</Link>
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
        <div className="absolute top-16 left-0 right-0 bg-black z-50 md:hidden">
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link to="/" className="flex items-center">Home</Link>
            <Link to="/commissions" className="flex items-center">Commissions</Link>

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

            {/* Mobile Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="https://x.com/WaifuScans418" target="_blank" rel="noopener noreferrer" className="text-xl">
                <RiTwitterXFill />
              </a>
              <a href="https://www.instagram.com/waifuscans418/" target="_blank" rel="noopener noreferrer" className="text-xl">
                <FaInstagram />
              </a>
              <a href="https://www.patreon.com/WaifuScans418" target="_blank" rel="noopener noreferrer" className="text-xl">
                <FaPatreon />
              </a>
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

        <div className="flex items-center space-x-4">
          <a href="https://x.com/WaifuScans418" target="_blank" rel="noopener noreferrer" className="text-xl">
            <RiTwitterXFill />
          </a>
          <a href="https://www.instagram.com/waifuscans418/" target="_blank" rel="noopener noreferrer" className="text-xl">
            <FaInstagram />
          </a>
          <a href="https://www.patreon.com/WaifuScans418" target="_blank" rel="noopener noreferrer" className="text-xl">
            <FaPatreon />
          </a>
        </div>
      </div>
    </nav>
  )
}
