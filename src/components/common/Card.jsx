import React, { useState } from 'react';
import { FaMars, FaVenus, FaTransgender } from 'react-icons/fa';
import { LuImages } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GalleryModal from './GalleryModal';

export default function Card({ character }) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const navigate = useNavigate();

    const renderGenderIcon = (gender) => {
        if (gender === 'Male') return <FaMars className="text-blue-500" />;
        if (gender === 'Female') return <FaVenus className="text-pink-500" />;
        return <FaTransgender className="text-purple-500" />;
    };

    const handleCardClick = () => setIsGalleryOpen(true);

    return (
        <>
            <FlipCardWrapper>
                <div
                    className="flip-card aspect-[6/7] md:aspect-[9/12] bg-gray-800/20 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"

                    onClick={handleCardClick}>
                    <div className="flip-card-inner">
                        {/* Front */}
                        <div className="flip-card-front">
                            <div className="relative w-full h-full">
                                <img
                                    src={character.image || "/placeholder.svg"}
                                    alt={character.name}
                                    className="w-full h-full object-cover object-center rounded-lg"
                                />
                                <div className="absolute top-2 right-2 bg-gray-800/80 rounded-md px-2 py-1 flex items-center text-white text-sm">
                                    <LuImages className="mr-1" />
                                    <span>{character.imagesCount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Back */}
                        <div className="flip-card-back relative rounded-lg overflow-hidden">
                            {/* Blurred Background Image */}
                            <img
                                src={character.image || "/placeholder.svg"}
                                alt={character.name}
                                className="w-full h-full object-cover object-center   "
                            />

                            {/* Frosted Glass Overlay Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white  bg-black/40 p-5 space-y-4 text-center rounded-lg">
                                {/* Character Name */}
                                <h2 className="text-2xl md:text-5xl font-bold tracking-wide drop-shadow-sm">{character.name}</h2>

                                {/* Total Images Count */}
                                <div className="flex items-center justify-center gap-2 px-3 py-1 bg-white/20 rounded-full backdrop-blur-md text-sm font-medium text-white shadow-md">
                                    <LuImages className="text-lg text-white" />
                                    <span>{character.imagesCount} {character.imagesCount === 1 ? "Image" : "Images"}</span>
                                </div>

                                {/* Upload Date */}
                                <div className="text-sm text-gray-200">
                                    Uploaded on:{" "}
                                    <span className="font-semibold text-white">
                                        {new Date(character.uploadedAt || Date.now()).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </FlipCardWrapper>

            {/* Gallery Modal */}
            <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} character={character} />
        </>
    );
}

const FlipCardWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    perspective: 1000px;
    cursor: pointer;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 0.5rem; /* same as Tailwind 'rounded-lg' */
    overflow: hidden;
  }

  .flip-card-back {
    transform: rotateY(180deg);
  }
`;
