import { Link } from "react-router-dom"
import { RiTwitterXFill } from "react-icons/ri";
import { GrInstagram } from "react-icons/gr";

const HeroSection = () => {
    return (
        <div className="relative w-full bg-black text-white overflow-hidden">
            {/* Hero Banner */}
            <div className="relative h-[60vh] md:h-[60vh] lg:h-[60vh] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://geekculture.co/wp-content/uploads/2023/09/jump-assemble-mobile-moba.jpg')",
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
                <div className="container mx-auto flex flex-col items-center">
                    {/* Profile image */}
                    <div className="relative -mt-20 z-20">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5dksLlvWydTpCurFMiA0nCh4giG9CpRvp6Q&s"
                            alt="Goku Profile"
                            className="w-24 h-24 rounded-full border-4 border-yellow-500 object-cover"
                        />
                    </div>

                    {/* Profile info */}
                    <h2 className="text-2xl md:text-3xl font-bold mt-4">WaifuScans418</h2>


                    {/* Social icons */}
                    <div className="flex space-x-6 mt-6">
                        <Link to="https://x.com/WaifuScans418" target="_blank" className="text-gray-400 hover:text-white">
                            <RiTwitterXFill size="25" />
                        </Link>
                        <Link to="https://www.instagram.com/waifuscans418/" target="_blank" className="text-gray-400 hover:text-white">
                            <GrInstagram size="25" />

                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
