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

  const [activeTab, setActiveTab] = useState("guide")

  const tabContent = {
    guide: {
      title: "Guide",
      content: [
        {
          label: "Understand the Process:",
          description:
            "Before submitting a commission request, it's important to understand the full process. This includes how to prepare your details, submit them, and what to expect after submission.",
        },
        {
          label: "Provide Clear Details:",
          description:
            "When filling out a request, clarity is key. Include all relevant information in a well-organized format to ensure your vision is accurately understood.",
        },
        {
          label: "Respect Time and Limits:",
          description:
            "Commissions take time, and artists may have limited slots. Be respectful of wait times, and follow any listed rules regarding revisions or cancellations.",
        },
      ],
    },
    workingon: {
      title: "Currently Working On",
      content: [
        {
          label: "Commission Queue:",
          description:
            "These are the active commissions currently being worked on. They are handled in the order received unless otherwise noted for priority.",
        },
        {
          label: "Status Updates:",
          description:
            "Clients will receive updates during key stages of the commission. These may include sketches, color blocking, and final touches for review.",
        },
        {
          label: "Expected Timelines:",
          description:
            "Each project has its own timeline depending on complexity. Most commissions are completed within a few days to a couple of weeks.",
        },
      ],
    },
    done: {
      title: "Completed Commissions",
      content: [
        {
          label: "Showcase Gallery:",
          description:
            "Here you can view past commissions that have been completed. This provides insight into the style, detail level, and variety offered.",
        },
        {
          label: "Client Satisfaction:",
          description:
            "Completed works reflect the quality and care given to each piece. Feedback from previous clients is often available as testimonials.",
        },
        {
          label: "Portfolio Reference:",
          description:
            "Use these examples as a reference for your own request. They can help you understand what’s possible and inspire new ideas.",
        },
      ],
    },
    request: {
      title: "How to Request",
      content: [
        {
          label: "Review the Guide:",
          description:
            "Start by reading the general guide to understand what's required. This will help you gather the right details and avoid common mistakes.",
        },
        {
          label: "Prepare Your Details:",
          description:
            "Include information such as character name, appearance, personality, preferred pose, and visual references. Be as specific as possible.",
        },
        {
          label: "Submit Your Request:",
          description:
            "Send your request using the designated method (form, email, or Discord). Double-check your submission for completeness before sending.",
        },
        {
          label: "Await Confirmation:",
          description:
            "The artist will review your request and confirm if it's accepted. You'll then receive payment instructions and a timeline for delivery.",
        },
      ],
    },
  };




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
        <div className="bg-gray-950 px-4 py-16 flex-grow">

          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column - Contains */}
              <div className="md:col-span-1">
                <h2 className="text-3xl font-bold mb-8">Contains</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <button
                      onClick={() => setActiveTab("guide")}
                      className={`flex gap-2 w-1/2 text-left px-4 py-2 rounded-md transition ${activeTab === "guide" ? "bg-blue-900 text-white" : "hover:bg-gray-800"
                        }`}
                    >
                      <span className="text-blue-500 mr-2 mt-1">
                        <SiListmonk />

                      </span>
                      Guide
                    </button>
                  </li>
                  <li className="flex items-start">
                    <button
                      onClick={() => setActiveTab("workingon")}
                      className={`flex gap-2 w-1/2 text-left px-4 py-2 rounded-md transition ${activeTab === "workingon" ? "bg-blue-900 text-white" : "hover:bg-gray-800"
                        }`}
                    >
                      <span className="text-blue-500 mr-2 mt-1">
                        <SiListmonk />
                      </span>
                      Working On
                    </button>
                  </li>
                  <li className="flex items-start">
                    <button
                      onClick={() => setActiveTab("done")}
                      className={`flex gap-2 w-1/2 text-left px-4 py-2 rounded-md transition ${activeTab === "done" ? "bg-blue-900 text-white" : "hover:bg-gray-800"
                        }`}
                    >
                      <span className="text-blue-500 mr-2 mt-1">
                        <SiListmonk />
                      </span>
                      Done
                    </button>
                  </li>
                  <li className="flex items-start">
                    <button
                      onClick={() => setActiveTab("request")}
                      className={`flex gap-2 w-1/2 text-left px-4 py-2 rounded-md transition ${activeTab === "request" ? "bg-blue-900 text-white" : "hover:bg-gray-800"
                        }`}
                    >
                      <span className="text-blue-500 mr-2 mt-1">
                        <SiListmonk />
                      </span>
                      Request
                    </button>
                  </li>
                </ul>

              </div>

              {/* Right Column - Customization Options */}
              <div className="md:col-span-2">
                {/* <h2 className="text-3xl font-bold mb-8">Customization Options</h2> */}
                {/* <p className="text-gray-300 mb-8">Each commission includes a full set of approximately 50-100 images.</p>
                            <p className="text-gray-300 mb-8">You can specify the following information for your commission:</p> */}

                {/* Tab Content */}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-6">{tabContent[activeTab].title}</h3>
                  <ul className="space-y-6">
                    {tabContent[activeTab].content.map((item, index) => (
                      <li key={index} className="flex">
                        <span className="text-white mr-2">•</span>
                        <div>
                          {item.label && <span className="font-semibold">{item.label}</span>}{" "}
                          <span className="text-gray-300">{item.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="bg-gray-950 text-white py-8 px-4 border-t border-gray-600">
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
