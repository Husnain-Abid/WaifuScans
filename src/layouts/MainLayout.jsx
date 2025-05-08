// /layouts/MainLayout.jsx

import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";


const MainLayout = ({ children }) => {
  return (
    <>
<div className="min-h-screen flex flex-col">
  <Navbar />
  <main className="flex-grow bg-gray-900">{children}</main>
  <Footer />
</div>

    </>
  );
};

export default MainLayout;
