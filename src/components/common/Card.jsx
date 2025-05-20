import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa"
import { FaMars, FaVenus, FaTransgender } from "react-icons/fa"  // Import gender-related icons
import { BiImages } from "react-icons/bi";
import { useNavigate } from "react-router-dom"
import GalleryModal from './GalleryModal';


export default function Card({ character }) {

    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const navigate = useNavigate();

    // Conditional rendering of the heart icon based on gender
    const renderGenderIcon = (gender) => {
        if (gender === "Male") {
            return <FaMars className="text-blue-500" title="Male" />;  // Male gender icon (Mars)
        } else if (gender === "Female") {
            return <FaVenus className="text-pink-500" title="Female" />;  // Female gender icon (Venus)
        } else {
            return <FaTransgender className="text-purple-500" title="Non-binary" />;  // Gender-neutral icon
        }
    };


    // const handleCardClick = () => {
    //     navigate(`/gallery/${character.id}`);
    // };

    const handleCardClick = () => {
        setIsGalleryOpen(true)
    }
    return (
        <>


            <div
                key={character.id}
                onClick={handleCardClick}
                className="aspect-[9/12] md:aspect-[9/14] bg-gray-800/20 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
                <div className="flex flex-col h-full">
                    {/* Image container - 75% height */}
                    <div className="relative h-4/5">
                        <img
                            src={character.image || "/placeholder.svg"}
                            alt={character.name}
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute top-2 right-2 bg-gray-800/80 rounded-md px-2 py-1 flex items-center">
                            <BiImages className="text-white mr-1" />
                            <span className="text-sm">{character.imagesCount}</span>
                        </div>
                    </div>

                    {/* Text content - 25% height */}
                    <div className="p-4 h-1/5">
                        <div className="flex justify-center items-start mb-2">
                            <h3 className="text-2xl font-bold">{character.name}</h3>
                        </div>



                    </div>
                </div>
            </div>















            {/* Gallery Modal */}
            <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} character={character} />
        </>


    )
}
