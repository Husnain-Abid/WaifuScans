import { Link } from "react-router-dom"
import { RiTwitterXFill } from "react-icons/ri";
import { GrInstagram } from "react-icons/gr";
import { useEffect, useState } from "react";
import { BASE_URL, IMG_URL } from "../../utils/apiURL";
import axios from "axios";

const HeroSection = () => {

    const [settings, setSettings] = useState(null)

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

    console.log(settings);

    return (
        <div className="relative w-full bg-black text-white overflow-hidden">
            {/* Hero Banner */}
            <div className="relative h-[60vh] md:h-[60vh] lg:h-[60vh] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${settings?.banner ? IMG_URL + settings.banner : "https://geekculture.co/wp-content/uploads/2023/09/jump-assemble-mobile-moba.jpg"}')`,
                        backgroundPosition: "center 30%",
                        filter: "brightness(0.7)",
                    }}
                ></div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

                {/* Logo overlay */}
                <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-black/70 px-6 py-3 rounded-lg border-2 border-yellow-500 shadow-lg shadow-yellow-500/50">
                        <h1 className="text-4xl font-poppins  md:text-5xl lg:text-6xl font-bold text-center ">
                            <span className="text-white">Waifu</span>
                            <span className="bg-yellow-600 text-black rounded ">Scans</span>
                            <span className="text-white">418</span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Profile section */}
            <div className="bg-black py-8 px-4">
                <div className="container mx-auto flex flex-col items-center font-inter">


                    {/* Profile info */}
                    <h2 className="text-2xl md:text-3xl font-bold mt-4">Welcome</h2>

                    {/* websote description */}
                    <h2 className="text-xl text-center md:text-2xl font-bold mt-4">{settings?.description || "Login to Patreon to unlock the gallery"}</h2>

                    {/* CTA Button */}
                    <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-8 rounded-md transition-all duration-300 transform hover:scale-105">
                        Patreon Login
                    </button>

                </div>
            </div>
        </div>
    )
}

export default HeroSection
