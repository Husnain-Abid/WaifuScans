// /pages/Commission.jsx

import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { SiListmonk } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram, FaPatreon } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../utils/apiURL";

const Commission = () => {

  // mock tab content 
  // const [activeTab, setActiveTab] = useState("guide")

  const [tabs, setTabs] = useState({});
  const [activeTabKey, setActiveTabKey] = useState("");

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/commission`);
        const mappedTabs = {};
        data.forEach((tab) => {
          mappedTabs[tab._id] = tab;
        });
        setTabs(mappedTabs);
        if (data.length > 0) setActiveTabKey(data[0]._id);
      } catch (err) {
        console.error("Failed to load commission tabs", err);
      }
    };
    fetchTabs();
  }, []);



  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen  text-white">
        {/* Hero Section */}
        <div className="py-20 relative">
          <div className="absolute inset-0 "></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-center">COMMISSIONS</h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-gray-900 px-4 py-16 flex-grow">

          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column - Contains */}
              <div className="md:col-span-1">
                <h2 className="text-3xl font-bold mb-8">Contains</h2>
                <ul className="space-y-4">
                  {Object.keys(tabs).map((key) => (
                    <li key={key} className="flex items-start">
                      <button
                        onClick={() => setActiveTabKey(key)}
                        className={`flex gap-2 w-full text-left px-4 py-2 rounded-md transition ${activeTabKey === key
                            ? "bg-blue-900 text-white"
                            : "hover:bg-gray-800"
                          }`}
                      >
                        <span className="text-blue-500 mr-2 mt-1">
                          <SiListmonk />
                        </span>
                        {tabs[key].title}
                      </button>
                    </li>
                  ))}
                </ul>


              </div>

              {/* Right Column - Customization Options */}
              <div className="md:col-span-2">
                {/* <h2 className="text-3xl font-bold mb-8">Customization Options</h2> */}
                {/* <p className="text-gray-300 mb-8">Each commission includes a full set of approximately 50-100 images.</p>
                            <p className="text-gray-300 mb-8">You can specify the following information for your commission:</p> */}

                {/* Tab Content */}
                {activeTabKey && tabs[activeTabKey] && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-6">
                      {tabs[activeTabKey].title}
                    </h3>
                    <ul className="space-y-6">
                      {tabs[activeTabKey].content.map((item, index) => (
                        <li key={index} className="flex">
                          <span className="text-white mr-2">•</span>
                          <div>
                            {item.label && (
                              <span className="font-semibold">{item.label}</span>
                            )}{" "}
                            <span className="text-gray-300">{item.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 px-4 border-t border-gray-600">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-end gap-4">
            <div className="flex items-center space-x-4">
              <a
                href="https://x.com/WaifuScans418"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-gray-300"
              >
                <RiTwitterXFill />
              </a>
              <a
                href="https://www.instagram.com/waifuscans418/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-gray-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.patreon.com/WaifuScans418"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-gray-300"
              >
                <FaPatreon />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </MainLayout>

  );
};

export default Commission;
