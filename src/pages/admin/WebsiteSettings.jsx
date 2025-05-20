"use client";
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import {BASE_URL} from "../../utils/apiURL";

const WebsiteSettings = () => {
  const [settings, setSettings] = useState({
    logo: null,
    banner: null,
    profileName: "My Art Studio",
    description: "Welcome to my waifuscan page!",
    twitter: "",
    instagram: "",
    patreon: "",
    discord : "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/settings`);
        setSettings(res.data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };

    fetchSettings();
  }, []);


  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setSettings((prev) => ({
        ...prev,
        [key]: file,
      }));
    }
  };


  const handleRemoveImage = (key) => {
    setSettings((prev) => ({ ...prev, [key]: null }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // Append files only if they are File objects
      if (settings.logo instanceof File) {
        formData.append("logo", settings.logo);
      }
      if (settings.banner instanceof File) {
        formData.append("banner", settings.banner);
      }

      // Append text fields
      formData.append("profileName", settings.profileName);
      formData.append("description", settings.description);
      formData.append("twitter", settings.twitter);
      formData.append("instagram", settings.instagram);
      formData.append("patreon", settings.patreon);
      formData.append("discord", settings.discord);

      const res = await axios.put(`${BASE_URL}/settings`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Settings saved successfully!");
      setSettings(res.data);
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save settings.");
    }
  };


  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Website Settings</h1>

        {/* Logo Upload */}
        {/* <div className="mb-6"> */}
          {/* <label className="block font-medium mb-2">Site Logo</label> */}
          {/* {settings.logo ? (
            <div className="relative inline-block"> */}
              {/* <img src={settings.logo} alt="Logo" className="w-32 h-auto rounded border" /> */}
              {/* <img
                src={
                  settings.logo instanceof File
                    ? URL.createObjectURL(settings.logo)
                    : `http://localhost:8080${settings.logo}`
                }
                alt="Logo"
                className="w-32 h-auto rounded border"
              />

              <button
                onClick={() => handleRemoveImage("logo")}
                className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
              >
                ✕
              </button>
            </div>
          ) : (
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "logo")} />
          )} */}
        {/* </div> */}

        {/* Banner Upload */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Banner Image</label>
          {settings.banner ? (
            <div className="relative">

              <img
                src={
                  settings.banner instanceof File
                    ? URL.createObjectURL(settings.banner)
                    : `http://localhost:8080${settings.banner}`
                }
                alt="Banner" className="w-full max-h-48 object-cover rounded border"
              />

              <button
                onClick={() => handleRemoveImage("banner")}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
              >
                ✕
              </button>
            </div>
          ) : (
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "banner")} />
          )}
        </div>

        {/* Profile Name */}
        {/* <div className="mb-4">
          <label className="block font-medium mb-1">Profile Name</label>
          <input
            type="text"
            name="profileName"
            value={settings.profileName}
            onChange={handleTextChange}
            className="w-full border rounded px-3 py-2"
          />
        </div> */}

        {/* Description */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={settings.description}
            onChange={handleTextChange}
            className="w-full border rounded px-3 py-2"
            rows="4"
          />
        </div>

        {/* Social Media Links */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Instagram</label>
          <input
            type="text"
            name="instagram"
            value={settings.instagram}
            onChange={handleTextChange}
            className="w-full border rounded px-3 py-2"
            placeholder="https://instagram.com/yourprofile"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Twitter</label>
          <input
            type="text"
            name="twitter"
            value={settings.twitter}
            onChange={handleTextChange}
            className="w-full border rounded px-3 py-2"
            placeholder="https://twitter.com/yourprofile"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Patreon</label>
          <input
            type="text"
            name="patreon"
            value={settings.patreon}
            onChange={handleTextChange}
            className="w-full border rounded px-3 py-2"
            placeholder="https://facebook.com/yourprofile"
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Discord</label>
          <input
            type="text"
            name="discord"
            value={settings.discord}
            onChange={handleTextChange}
            className="w-full border rounded px-3 py-2"
            placeholder="https://youtube.com/yourchannel"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Save Settings
        </button>
      </div>
    </AdminLayout>
  );
};

export default WebsiteSettings;
