// /pages/Home.jsx

import { useEffect, useState } from "react";
import CardListingSection from "../components/common/CardListingSection";
import HeroSection from "../components/common/HeroSection";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { BASE_URL } from "../utils/apiURL";


const Home = () => {



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




    return (
        <MainLayout>
            <HeroSection settings={settings} />
            <CardListingSection settings={settings} />
        </MainLayout>
    );
};

export default Home;
