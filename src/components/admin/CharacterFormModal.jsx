import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios"; // Import Axios
import  { BASE_URL, IMG_URL } from "../../utils/apiURL"

const CharacterFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "Male",
    tags: "",
    coverImageFile: null, // file object
    coverImagePreview: "", // for previewing the image
  });


  const [loading, setLoading] = useState(false); // Loading state for image upload

useEffect(() => {
  if (initialData) {
    // Edit mode
    setFormData({
      name: initialData.name || "",
      gender: initialData.gender || "Male",
      tags: (initialData.tags || []).join(", "),
      coverImageFile: null,
      coverImagePreview: initialData.coverImage || "",
    });
  } else {
    // Add mode
    resetForm();
  }
}, [initialData, isOpen]); // Also depend on isOpen



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload to Cloudinary (or other image hosting service)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        coverImageFile: file,
        coverImagePreview: URL.createObjectURL(file),
      }));
    }
  };


  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("tags", formData.tags);
    if (formData.coverImageFile) {
      formDataToSend.append("coverImage", formData.coverImageFile); // This matches your Multer key
    }

    try {
      const url = initialData
        ? `${BASE_URL}/characters/${initialData._id}`
        : `${BASE_URL}/characters`;

      const response = initialData
        ? await axios.put(url, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        : await axios.post(url, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });

      onSave(response.data);
      onClose();
      resetForm();
    } catch (error) {
      console.error("Error saving character:", error);
    }
  };


  // Reset form data
const resetForm = () => {
  setFormData({
    name: "",
    gender: "Male",
    tags: "",
    coverImageFile: null,
    coverImagePreview: "",
  });
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">{initialData ? "Edit Character" : "Add New Character"}</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Character Name"
            className="w-full border px-3 py-2 rounded"
            value={formData.name}
            onChange={handleChange}
          />
          <select
            name="gender"
            className="w-full border px-3 py-2 rounded"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="w-full border px-3 py-2 rounded"
            value={formData.tags}
            onChange={handleChange}
          />

          {/* Image Upload Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border px-3 py-2 rounded"
              onChange={handleFileChange}
            />
            {formData.coverImagePreview && (
              <div className="mt-2">
                <img
                  src={formData.coverImagePreview}
                  alt="Cover Preview"
                  className="max-w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>


        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterFormModal;
