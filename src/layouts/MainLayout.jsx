// /layouts/MainLayout.jsx

import { useEffect, useRef } from "react";
import Navbar from "../components/common/Navbar";

const MainLayout = ({ children }) => {
  const headerRef = useRef(null);

  useEffect(() => {
    // Load script dynamically
    const script = document.createElement("script");
    script.src = "/finisher-header.es5.min.js"; // from public folder
    script.type = "text/javascript";
    script.onload = () => {
      new window.FinisherHeader({
        count: 100,
        size: { min: 2, max: 8, pulse: 0 },
        speed: {
          x: { min: 0, max: 0.4 },
          y: { min: 0, max: 0.6 },
        },
        colors: {
          background: "#080808",
          particles: ["#384d8e", "#484990", "#363caf"],
        },
        blending: "normal", // Less aggressive than overlay
        opacity: { center: 1, edge: 0 },
        skew: 0, // 🔧 Remove curve artifacts
        shapes: ["c"],
      });
    };

    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Finisher Background */}
      <div
        className="header finisher-header absolute inset-0 -z-10"
        ref={headerRef}
        style={{ width: "100%", height: "100%" }}
      ></div>

      {/* Page Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow w-full text-white">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default MainLayout;
