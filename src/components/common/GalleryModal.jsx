"use client"

import { useState, useEffect, useRef } from "react"
import { FaPatreon, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa"

const GalleryModal = ({ isOpen, onClose, character }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const modalRef = useRef(null)
  const scrollContainerRef = useRef(null)

  // Mock images array - in a real app, this would come from the character prop
  const allImages =
    character?.images ||
    Array(10)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        url: `/character-${character?.id || 1}-image-${index + 1}.jpg`,
        // Fallback to placeholder if images aren't available
        placeholder: `https://source.unsplash.com/random/800x1000?sig=${index}&anime`,
      }))

  // Only show first 5 images initially
  const visibleImages = allImages.slice(0, 5)
  const hiddenImages = allImages.slice(5)

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        navigateImages(-1)
      } else if (e.key === "ArrowRight") {
        navigateImages(1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentImageIndex, onClose])

  const navigateImages = (direction) => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev + direction
      if (newIndex < 0) return visibleImages.length - 1
      if (newIndex >= visibleImages.length) return 0
      return newIndex
    })
  }

  const scrollToImage = (index) => {
    if (scrollContainerRef.current) {
      const imageElement = scrollContainerRef.current.children[index]
      if (imageElement) {
        imageElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 overflow-hidden">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2"
        aria-label="Close gallery"
      >
        <FaTimes size={24} />
      </button>

      {/* Character name */}
      <div className="absolute top-4 left-4 z-50">
        <h2 className="text-2xl font-bold text-white">{character?.name || "Character Gallery"}</h2>
      </div>

      {/* Main gallery container */}
      <div
        ref={modalRef}
        className="w-full h-full flex flex-col items-center overflow-y-auto py-16"
        onClick={(e) => {
          if (e.target === modalRef.current) onClose()
        }}
      >
        <div ref={scrollContainerRef} className="w-full max-w-4xl flex flex-col items-center gap-8">
          {/* Visible images */}
          {visibleImages.map((image, index) => (
            <div key={image.id} className="relative w-full flex justify-center" style={{ scrollMarginTop: "2rem" }}>
              <img
                src={image.url || image.placeholder}
                alt={`${character?.name || "Character"} image ${index + 1}`}
                className="w-1/2 h-auto object-contain rounded-lg shadow-2xl"
                style={{ maxHeight: "60vh" }}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = image.placeholder
                }}
              />

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                {index + 1} / {allImages.length}
              </div>
            </div>
          ))}

          {/* Patreon login section */}
          {hiddenImages.length > 0 && (
            <div className="w-full flex flex-col items-center gap-6 py-8 px-4 bg-gray-900 rounded-lg">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">{hiddenImages.length} More Images Available</h3>
                <p className="text-gray-300">
                  Support us on Patreon to unlock all {allImages.length} images in this gallery
                </p>
              </div>

              <button className="flex items-center gap-2 bg-[#FF424D] hover:bg-[#E23744] text-white font-bold py-3 px-6 rounded-md transition-colors">
                <FaPatreon size={20} />
                <span>LOG IN WITH PATREON</span>
              </button>

              {/* Blurred preview of first locked image */}
              <div className="relative w-full flex justify-center mt-4">
                <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md z-10 flex items-center justify-center">
                  <div className="text-white text-center">
                    <FaPatreon size={40} className="mx-auto mb-2" />
                    <p className="font-bold">Unlock with Patreon</p>
                  </div>
                </div>
                <img
                  src={hiddenImages[0].placeholder || "/placeholder.svg"}
                  alt="Locked preview"
                  className="w-1/2 h-auto object-contain rounded-lg opacity-70"
                  style={{ maxHeight: "40vh" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => {
          navigateImages(-1)
          scrollToImage(currentImageIndex - 1 < 0 ? visibleImages.length - 1 : currentImageIndex - 1)
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full"
        aria-label="Previous image"
      >
        <FaChevronLeft size={24} />
      </button>

      <button
        onClick={() => {
          navigateImages(1)
          scrollToImage(currentImageIndex + 1 >= visibleImages.length ? 0 : currentImageIndex + 1)
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full"
        aria-label="Next image"
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  )
}

export default GalleryModal
