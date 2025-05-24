"use client"

import { useEffect, useState } from "react"
import { FaSearch, FaChevronDown, FaInstagram, FaPatreon } from "react-icons/fa"
import Card from "./Card"
import { Link } from "react-router-dom"
import { RiTwitterXFill } from "react-icons/ri"
import axios from "axios"
import { BASE_URL } from "../../utils/apiURL"

const CardListingSection = () => {
    const [characters, setCharacters] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTag, setSelectedTag] = useState("All Characters")
    const [isTagsOpen, setIsTagsOpen] = useState(false)
    const [visibleCount, setVisibleCount] = useState(8) // State to track visible characters

    const allTags = ["All Characters", "Saiyan", "Human", "Villain", "Z Fighter", "Alien"]

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/characters`) // adjust baseURL if needed
                setCharacters(res.data)
            } catch (err) {
                console.error("Error fetching characters:", err)
            }
        }

        fetchCharacters()
    }, [])


    const filteredCharacters = characters.filter((character) => {
        const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesTag = selectedTag === "All Characters" || character.tags.includes(selectedTag)
        return matchesSearch && matchesTag
    })

    const handleLoadMore = () => {
        setVisibleCount(visibleCount + 8)
    }

    console.log(characters);
    

    return (
        <div className=" text-white py-8 px-4 min-h-screen">
            <div className="container mx-auto">
                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-500" />
                    </div>

                    <div className="relative">
                        <button
                            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-between min-w-[200px]"
                            onClick={() => setIsTagsOpen(!isTagsOpen)}
                        >
                            <span>{selectedTag}</span>
                            <FaChevronDown className={`ml-2 transition-transform ${isTagsOpen ? "rotate-180" : ""}`} />
                        </button>

                        {isTagsOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                                {allTags.map((tag) => (
                                    <div
                                        key={tag}
                                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                        onClick={() => {
                                            setSelectedTag(tag)
                                            setIsTagsOpen(false)
                                        }}
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCharacters.slice(0, visibleCount).map((character) => (
                        <Card key={character.id} character={character} />
                    ))}
                </div>

                {/* Load More Button */}
                {filteredCharacters.length > visibleCount && (
                    <div className="text-center mt-6">
                        <button
                            onClick={handleLoadMore}
                            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                        >
                            Load More
                        </button>
                    </div>
                )}

                <div className="flex flex-col items-end gap-2 my-10">
                    <div className="space-y-4">

                        <Link to="https://www.patreon.com/WaifuScans418" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            <FaPatreon />
                            Patreon
                        </Link>
                        <Link to="https://x.com/WaifuScans418" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            <RiTwitterXFill />
                            Twitter
                        </Link>
                        <Link to="https://www.instagram.com/waifuscans418/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            <FaInstagram />
                            Instagram
                        </Link>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default CardListingSection
