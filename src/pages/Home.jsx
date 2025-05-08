// /pages/Home.jsx

import CardListingSection from "../components/common/CardListingSection";
import HeroSection from "../components/common/HeroSection";
import MainLayout from "../layouts/MainLayout";


const Home = () => {
    return (
        <MainLayout>
            <HeroSection/>
            <CardListingSection/>
        </MainLayout>
    );
};

export default Home;
