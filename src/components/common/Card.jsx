import React from 'react'
import { FaHeart} from "react-icons/fa"
import { FaMars, FaVenus, FaTransgender } from "react-icons/fa"  // Import gender-related icons
import { BiImages } from "react-icons/bi";
import { useNavigate } from "react-router-dom"


export default function Card({ character }) {
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

    
    const handleCardClick = () => {
        navigate(`/gallery/${character.id}`);
    };

    return (
        <div key={character.id}
        // onClick={handleCardClick}
        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <div className="relative">
                <img
                    src={character.image || "/placeholder.svg"}
                    alt={character.name}
                    className="w-full h-64 object-cover object-center"
                />
                <div className="absolute top-2 left-2 bg-gray-200 rounded-full p-1">
                    {renderGenderIcon(character.gender)}  {/* Gender-specific icon */}
                </div>
                <div className="absolute top-2 right-2 bg-gray-800/80 rounded-md px-2 py-1 flex items-center">
                    <BiImages className="text-white mr-1" />
                    <span className="text-sm">{character.imagesCount}</span>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-center items-start mb-2">
                    <h3 className="text-xl font-bold ">{character.name}</h3>
                    {/* <div className="flex items-center">
                        <FaHeart className="text-red-500 mr-1" />
                        <span className="text-sm">{character.likes}</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
