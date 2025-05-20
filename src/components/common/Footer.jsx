import React from 'react'
import profile from "../../assets/profile.jpg"
import { FaInstagram, FaPatreon } from 'react-icons/fa'
import { RiTwitterXFill } from "react-icons/ri"
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="bg-gray-900 text-white py-8 px-4">
      <div className="container mx-auto border-t border-gray-600 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={profile} alt="logo" className="w-40" />
        </div>

        {/* Social Media Links */}
        <div className="flex items-center space-x-4">
          <a
            href="https://x.com/WaifuScans418"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-300"
          >
            <RiTwitterXFill />
          </a>
          <a
            href="https://www.instagram.com/waifuscans418/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.patreon.com/WaifuScans418"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-300"
          >
            <FaPatreon />
          </a>
        </div>
      </div>
    </div>
  )
}
