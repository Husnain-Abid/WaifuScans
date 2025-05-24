import { useParams } from "react-router-dom";

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
            "https://wallpapers.com/images/hd/goku-in-ultra-instinct-form-dbz-jbv9wggf2wx9yp7i.jpg",
            "https://staticg.sportskeeda.com/editor/2022/12/0f33c-16701663224265-1920.jpg",
            "https://i.pinimg.com/originals/8a/7e/f7/8a7ef7d6c6b5d7b93a29642d1e6634fa.jpg"
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
            "https://images7.alphacoders.com/673/673499.jpg",
            "https://wallpapers.com/images/hd/vegeta-final-flash-8k-dbz-qbb7keu32w25z9bb.jpg",
            "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/09/vegeta.jpg",
            "https://i.pinimg.com/originals/bb/98/f1/bb98f194efbbcf7f65df03ecb11d8c4c.jpg"
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
            "https://c4.wallpaperflare.com/wallpaper/514/74/570/dragon-ball-dragon-ball-z-gohan-dragon-ball-super-saiyan-2-hd-wallpaper-preview.jpg",
            "https://wallpapers.com/images/featured/gohan-ultra-instinct-3pc5j6cg9vuzcg7k.jpg",
            "https://www.animeexplained.com/wp-content/uploads/2023/02/Gohan-Beast-Transformation.jpg"
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
            "https://dragonball.guru/wp-content/uploads/2021/03/piccolo-scared.jpg",
            "https://wallpapers.com/images/hd/piccolo-dragon-ball-z-8k-wallpaper-4w9x0zq6qz6x0b7i.jpg",
            "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/09/piccolo.jpg"
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
            "https://c4.wallpaperflare.com/wallpaper/127/553/144/dragon-ball-z-trunks-character-blue-eyes-saiyan-wallpaper-preview.jpg",
            "https://wallpapers.com/images/hd/trunks-super-saiyan-2-dbz-8k-wallpaper-7g7w0zq6qz6x0b7i.jpg",
            "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/09/trunks.jpg"
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
            "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/02/Bulma-DBS.jpg",
            "https://wallpapers.com/images/hd/bulma-dragon-ball-z-8k-wallpaper-4w9x0zq6qz6x0b7i.jpg",
            "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/09/bulma.jpg"
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
            "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/02/Bulma-DBS.jpg",
            "https://wallpapers.com/images/hd/bulma-dragon-ball-z-8k-wallpaper-4w9x0zq6qz6x0b7i.jpg",
            "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/09/bulma.jpg"
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
            "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/02/Bulma-DBS.jpg",
            "https://wallpapers.com/images/hd/bulma-dragon-ball-z-8k-wallpaper-4w9x0zq6qz6x0b7i.jpg",
            "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/09/bulma.jpg"
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
            "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/02/Bulma-DBS.jpg",
            "https://wallpapers.com/images/hd/bulma-dragon-ball-z-8k-wallpaper-4w9x0zq6qz6x0b7i.jpg",
            "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/09/bulma.jpg"
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
            "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/02/Bulma-DBS.jpg",
            "https://wallpapers.com/images/hd/bulma-dragon-ball-z-8k-wallpaper-4w9x0zq6qz6x0b7i.jpg",
            "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/09/bulma.jpg"
        ],
    },
];

export default function GalleryPage() {
    const { id } = useParams();
    const character = characters.find((char) => char.id === parseInt(id));

    if (!character) return <div className="text-white">Character not found</div>;

    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-6">
                {character.name}'s Gallery ({character.images.length} Images)
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {character.images.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`${character.name} ${index + 1}`}
                        className="w-full object-cover rounded-lg"
                    />
                ))}
            </div>
        </div>
    );
}
