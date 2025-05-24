"use client"

import { useState } from "react"
import { FaSearch, FaChevronDown, FaInstagram, FaPatreon } from "react-icons/fa"
import Card from "./Card"
import { Link } from "react-router-dom"
import { RiTwitterXFill } from "react-icons/ri"

const CardListingSection = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTag, setSelectedTag] = useState("All Characters")
    const [isTagsOpen, setIsTagsOpen] = useState(false)
    const [visibleCount, setVisibleCount] = useState(8) // State to track visible characters

    const characters = [
        {
            id: 1,
            name: "Goku",
            gender: "Male",
            image: "https://c4.wallpaperflare.com/wallpaper/655/531/669/4k-ultra-instinct-goku-8k-wallpaper-preview.jpg",
            powerLevel: "8,500+",
            tags: ["Saiyan", "Z Fighter", "Hero"],
            likes: 192,
            imagesCount: 4,
            images: [
                "https://c4.wallpaperflare.com/wallpaper/655/531/669/4k-ultra-instinct-goku-8k-wallpaper-preview.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpoYmhWidnxTqW85NzR2kOUK7VAnm4gjcvmf8A48-cArOv95UXnPNxwv9OaTYN-xThZ1w&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzieU9g1oEYk4_-E9gLeDBWs84CYfZ_StTC3HiihCtN5W6RnH42YnGliIom37DopzjUm8&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pCSQ4vYD_cI01Nwd7dtlUFPFJ1yK2DwTlu9jkLZwCy-lx9rAp1rYb-dlnsRF5Gk5tTM&usqp=CAU"
            ],
        },
        {
            id: 2,
            name: "Vegeta",
            gender: "Male",
            image: "https://images7.alphacoders.com/673/673499.jpg",
            powerLevel: "8,000+",
            tags: ["Saiyan", "Z Fighter", "Prince"],
            likes: 187,
            imagesCount: 4,
            images: [
                "https://c4.wallpaperflare.com/wallpaper/655/531/669/4k-ultra-instinct-goku-8k-wallpaper-preview.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpoYmhWidnxTqW85NzR2kOUK7VAnm4gjcvmf8A48-cArOv95UXnPNxwv9OaTYN-xThZ1w&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzieU9g1oEYk4_-E9gLeDBWs84CYfZ_StTC3HiihCtN5W6RnH42YnGliIom37DopzjUm8&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pCSQ4vYD_cI01Nwd7dtlUFPFJ1yK2DwTlu9jkLZwCy-lx9rAp1rYb-dlnsRF5Gk5tTM&usqp=CAU"
            ],
        },
        {
            id: 3,
            name: "Gohan",
            gender: "Male",
            image: "https://c4.wallpaperflare.com/wallpaper/514/74/570/dragon-ball-dragon-ball-z-gohan-dragon-ball-super-saiyan-2-hd-wallpaper-preview.jpg",
            powerLevel: "5,000+",
            tags: ["Half-Saiyan", "Z Fighter", "Scholar"],
            likes: 167,
            imagesCount: 3,
            images: [
                "https://c4.wallpaperflare.com/wallpaper/655/531/669/4k-ultra-instinct-goku-8k-wallpaper-preview.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpoYmhWidnxTqW85NzR2kOUK7VAnm4gjcvmf8A48-cArOv95UXnPNxwv9OaTYN-xThZ1w&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzieU9g1oEYk4_-E9gLeDBWs84CYfZ_StTC3HiihCtN5W6RnH42YnGliIom37DopzjUm8&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pCSQ4vYD_cI01Nwd7dtlUFPFJ1yK2DwTlu9jkLZwCy-lx9rAp1rYb-dlnsRF5Gk5tTM&usqp=CAU"
            ],
        },
        {
            id: 4,
            name: "Piccolo",
            gender: "Male",
            image: "https://dragonball.guru/wp-content/uploads/2021/03/piccolo-scared.jpg",
            powerLevel: "3,500+",
            tags: ["Namekian", "Z Fighter", "Mentor"],
            likes: 131,
            imagesCount: 3,
            images: [
                "https://c4.wallpaperflare.com/wallpaper/655/531/669/4k-ultra-instinct-goku-8k-wallpaper-preview.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpoYmhWidnxTqW85NzR2kOUK7VAnm4gjcvmf8A48-cArOv95UXnPNxwv9OaTYN-xThZ1w&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzieU9g1oEYk4_-E9gLeDBWs84CYfZ_StTC3HiihCtN5W6RnH42YnGliIom37DopzjUm8&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pCSQ4vYD_cI01Nwd7dtlUFPFJ1yK2DwTlu9jkLZwCy-lx9rAp1rYb-dlnsRF5Gk5tTM&usqp=CAU"
            ],
        },
        {
            id: 5,
            name: "Trunks",
            gender: "Male",
            image: "https://c4.wallpaperflare.com/wallpaper/127/553/144/dragon-ball-z-trunks-character-blue-eyes-saiyan-wallpaper-preview.jpg",
            powerLevel: "4,000+",
            tags: ["Half-Saiyan", "Z Fighter", "Time Traveler"],
            likes: 114,
            imagesCount: 3,
            images: [
                "https://c4.wallpaperflare.com/wallpaper/655/531/669/4k-ultra-instinct-goku-8k-wallpaper-preview.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpoYmhWidnxTqW85NzR2kOUK7VAnm4gjcvmf8A48-cArOv95UXnPNxwv9OaTYN-xThZ1w&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzieU9g1oEYk4_-E9gLeDBWs84CYfZ_StTC3HiihCtN5W6RnH42YnGliIom37DopzjUm8&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pCSQ4vYD_cI01Nwd7dtlUFPFJ1yK2DwTlu9jkLZwCy-lx9rAp1rYb-dlnsRF5Gk5tTM&usqp=CAU"
            ],
        },
        {
            id: 6,
            name: "Bulma",
            gender: "Female",
            image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/02/Bulma-DBS.jpg",
            powerLevel: "Genius",
            tags: ["Human", "Scientist", "Capsule Corp"],
            likes: 137,
            imagesCount: 3,
            images: [
                "https://c4.wallpaperflare.com/wallpaper/655/531/669/4k-ultra-instinct-goku-8k-wallpaper-preview.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpoYmhWidnxTqW85NzR2kOUK7VAnm4gjcvmf8A48-cArOv95UXnPNxwv9OaTYN-xThZ1w&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzieU9g1oEYk4_-E9gLeDBWs84CYfZ_StTC3HiihCtN5W6RnH42YnGliIom37DopzjUm8&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pCSQ4vYD_cI01Nwd7dtlUFPFJ1yK2DwTlu9jkLZwCy-lx9rAp1rYb-dlnsRF5Gk5tTM&usqp=CAU"
            ],
        },
        {
            id: 7,
            name: "Krillin",
            gender: "Male",
            image: "https://preview.redd.it/post-top-krillin-goes-back-to-the-buu-arc-how-well-does-he-v0-zdl8xc5ypmhb1.gif?format=png8&s=593c12de01ca66ce831a4878b9b521de5a0bce21",
            powerLevel: "1,770+",
            tags: ["Human", "Z Fighter", "Monk"],
            likes: 92,
            imagesCount: 3,
            images: [
                "https://c4.wallpaperflare.com/wallpaper/655/531/669/4k-ultra-instinct-goku-8k-wallpaper-preview.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpoYmhWidnxTqW85NzR2kOUK7VAnm4gjcvmf8A48-cArOv95UXnPNxwv9OaTYN-xThZ1w&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzieU9g1oEYk4_-E9gLeDBWs84CYfZ_StTC3HiihCtN5W6RnH42YnGliIom37DopzjUm8&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pCSQ4vYD_cI01Nwd7dtlUFPFJ1yK2DwTlu9jkLZwCy-lx9rAp1rYb-dlnsRF5Gk5tTM&usqp=CAU"
            ],
        },
        {
            id: 8,
            name: "Frieza",
            gender: "Unknown",
            image: "https://i1.sndcdn.com/avatars-000387329123-ikvouo-t500x500.jpg",
            powerLevel: "530,000+",
            tags: ["Villain", "Emperor", "Alien"],
            likes: 103,
            imagesCount: 3,
            images: [
                "https://c4.wallpaperflare.com/wallpaper/655/531/669/4k-ultra-instinct-goku-8k-wallpaper-preview.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpoYmhWidnxTqW85NzR2kOUK7VAnm4gjcvmf8A48-cArOv95UXnPNxwv9OaTYN-xThZ1w&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzieU9g1oEYk4_-E9gLeDBWs84CYfZ_StTC3HiihCtN5W6RnH42YnGliIom37DopzjUm8&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pCSQ4vYD_cI01Nwd7dtlUFPFJ1yK2DwTlu9jkLZwCy-lx9rAp1rYb-dlnsRF5Gk5tTM&usqp=CAU"
            ],
        },
        {
            id: 9,
            name: "Majin Buu",
            gender: "Male",
            image: "https://gamingbolt.com/wp-content/uploads/2024/09/Dragon-Ball-Sparking-ZERO_05_0-scaled.jpg",
            powerLevel: "Very High",
            tags: ["Villain", "Majin", "Monster"],
            likes: 156,
            imagesCount: 3,
            images: [
                "https://c4.wallpaperflare.com/wallpaper/655/531/669/4k-ultra-instinct-goku-8k-wallpaper-preview.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpoYmhWidnxTqW85NzR2kOUK7VAnm4gjcvmf8A48-cArOv95UXnPNxwv9OaTYN-xThZ1w&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzieU9g1oEYk4_-E9gLeDBWs84CYfZ_StTC3HiihCtN5W6RnH42YnGliIom37DopzjUm8&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pCSQ4vYD_cI01Nwd7dtlUFPFJ1yK2DwTlu9jkLZwCy-lx9rAp1rYb-dlnsRF5Gk5tTM&usqp=CAU"
            ],
        },
        {
            id: 10,
            name: "Cell",
            gender: "Male",
            image: "https://imgix.ranker.com/user_node_img/50088/1001749483/original/what_s-left-of-your-head-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=355",
            powerLevel: "Extremely High",
            tags: ["Villain", "Android", "Cell Saga"],
            likes: 123,
            imagesCount: 3,
            images: [
                "https://c4.wallpaperflare.com/wallpaper/655/531/669/4k-ultra-instinct-goku-8k-wallpaper-preview.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpoYmhWidnxTqW85NzR2kOUK7VAnm4gjcvmf8A48-cArOv95UXnPNxwv9OaTYN-xThZ1w&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzieU9g1oEYk4_-E9gLeDBWs84CYfZ_StTC3HiihCtN5W6RnH42YnGliIom37DopzjUm8&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pCSQ4vYD_cI01Nwd7dtlUFPFJ1yK2DwTlu9jkLZwCy-lx9rAp1rYb-dlnsRF5Gk5tTM&usqp=CAU"
            ],
        },
    ];



    const filteredCharacters = characters.filter((character) => {
        const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
    })

    const handleLoadMore = () => {
        setVisibleCount(visibleCount + 8)
    }

    return (
        <div className=" bg-gray-950 text-white py-8 px-4 min-h-screen">
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
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-md"
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