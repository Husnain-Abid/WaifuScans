import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const CharacterFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "Male",
    tags: "",
    coverImage: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        gender: initialData.gender || "Male",
        tags: (initialData.tags || []).join(", "),
        coverImage: initialData.coverImage || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newChar = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };
    onSave(newChar);
    onClose();
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
            <option value="Unknown">Other</option>
          </select>
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="w-full border px-3 py-2 rounded"
            value={formData.tags}
            onChange={handleChange}
          />
          <input
            type="text"
            name="coverImage"
            placeholder="Cover Image URL"
            className="w-full border px-3 py-2 rounded"
            value={formData.coverImage}
            onChange={handleChange}
          />
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
