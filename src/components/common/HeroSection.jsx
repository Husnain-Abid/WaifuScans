import { Link } from "react-router-dom";
import { IMG_URL } from "../../utils/apiURL";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // optional if you're using navigation
import SwiperCore, { Navigation } from 'swiper';
import { Autoplay } from 'swiper/modules';



const HeroSection = ({ settings }) => {



    const characters = [
        {
            id: 1,
            image: "https://c4.wallpaperflare.com/wallpaper/655/531/669/4k-ultra-instinct-goku-8k-wallpaper-preview.jpg",
        },
        {
            id: 2,
            image: "https://image.tensorartassets.com/cdn-cgi/image/anim=true,plain=false,w=2048,f=jpeg,q=85/posts/images/627016898516815605/9ad33d86-7d43-4ba1-82bb-511bdfdc2126.jpg",
        },
        {
            id: 3,
            image: "https://c4.wallpaperflare.com/wallpaper/514/74/570/dragon-ball-dragon-ball-z-gohan-dragon-ball-super-saiyan-2-hd-wallpaper-preview.jpg",
        },
        {
            id: 4,
            image: "https://images7.alphacoders.com/673/673499.jpg",
        },
        {
            id: 5,
            image: "https://c4.wallpaperflare.com/wallpaper/127/553/144/dragon-ball-z-trunks-character-blue-eyes-saiyan-wallpaper-preview.jpg",
        },
        {
            id: 6,
            image: "https://w0.peakpx.com/wallpaper/932/403/HD-wallpaper-dragon-ball-super-angry-goku-animation.jpg",
        },

    ];



    return (
        <div className="relative w-full  text-white overflow-hidden">
            {/* Hero Banner */}
            <div className="relative h-[50vh] md:h-[50vh] lg:h-[70vh] w-full overflow-hidden">

                <Swiper
                    spaceBetween={10}
                    slidesPerView={1.2}
                    loop={true}
                    freeMode={true}
                    speed={3000} // Transition speed (higher = smoother)
                    autoplay={{
                        delay: 0, // No delay between scroll
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    modules={[Autoplay]}
                    className="mySwiper h-full"
                >
                    {characters.map((character, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={character.image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover brightness-90 "
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>


                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

                {/* Logo overlay */}
                <div className="absolute top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className=" px-6 py-3 rounded-lg  border-yellow-500  shadow-yellow-500/50">
                        <h1 className="text-4xl font-poppins  md:text-5xl lg:text-[10rem] font-bold text-center ">
                            <span className="text-white  drop-shadow-[2px_4px_6px_rgba(0,0,0,0.8)]">Waifu</span>
                            <span className="text-yellow-600  rounded  drop-shadow-[2px_4px_6px_rgba(0,0,0,0.8)] ">Scans</span>
                            <span className="text-white  drop-shadow-[2px_4px_6px_rgba(0,0,0,0.8)]">418</span>
                        </h1>
                    </div>
                </div>
            </div>



            {/* Profile section */}
            <div className="py-24 px-4">
                <div className="container mx-auto flex flex-col items-center font-inter">


                    {/* Profile info */}
                    <h2 className="text-3xl md:text-5xl font-bold mt-4">Welcome</h2>

                    {/* websote description */}
                    <h2 className="text-xl text-center md:text-2xl font-bold mt-4">{settings?.description || "Login to Patreon to unlock the gallery"}</h2>

                    {/* CTA Button */}
                    <Link to="https://www.patreon.com/WaifuScans418" target="_blank" className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-8 rounded-md transition-all duration-300 transform hover:scale-105">
                        Patreon Login
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default HeroSection
