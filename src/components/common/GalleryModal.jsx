"use client"

import { useEffect, useRef } from "react"
import { FaPatreon, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"

const GalleryModal = ({ isOpen, onClose, character }) => {
  const modalRef = useRef(null)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  const images = character.images || []
  const visibleImages = images.slice(0, 5)

  console.log( "visibleImages", visibleImages );
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2"
      >
        <FaTimes size={24} />
      </button>

      <div className="absolute top-4 left-4 z-50">
        <h2 className="text-2xl font-bold text-white">{character?.name || "Character Gallery"}</h2>
      </div>

      <div ref={modalRef} className="w-full h-full flex flex-col items-center overflow-y-auto py-16">
        <div ref={scrollContainerRef} className="w-full max-w-4xl flex flex-col items-center gap-8">
          {visibleImages.map((imageUrl, index) => (
            <div key={index} className="relative w-full flex justify-center">
              <img
                src={imageUrl}
                alt={`image ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg shadow-2xl"
                style={{ maxHeight: "60vh" }}
              />
            </div>
          ))}

          {/* Patreon Block */}
          <div className="w-full flex flex-col items-center gap-6 py-8 px-4 bg-gray-900 rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">More Images</h3>
              <p className="text-gray-300">Support us on Patreon to unlock all images in this gallery</p>
            </div>

            <Link
              to="https://www.patreon.com/WaifuScans418"
              target="_blank"
              className="flex items-center gap-2 bg-[#FF424D] hover:bg-[#E23744] text-white font-bold py-3 px-6 rounded-md"
            >
              <FaPatreon size={20} />
              <span>LOG IN WITH PATREON</span>
            </Link>

            <div className="relative w-full flex justify-center mt-4">
              <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md z-10 flex items-center justify-center">
                <div className="text-white text-center">
                  <FaPatreon size={40} className="mx-auto mb-2" />
                  <p className="font-bold">Unlock with Patreon</p>
                </div>
              </div>
              <img
                src={images[0] || "/placeholder.svg"}
                alt="Locked preview"
                className="w-1/2 h-auto object-contain rounded-lg opacity-70"
                style={{ maxHeight: "40vh" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryModal
