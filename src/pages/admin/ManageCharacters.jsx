"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import CharacterFormModal from "../../components/admin/CharacterFormModal";
import axios from "axios"; // Import axios
import {BASE_URL} from "../../utils/apiURL";

const ManageCharacters = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch characters from API
  const fetchCharacters = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/characters`); // Adjust API endpoint as needed
      setCharacters(response.data);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle deleting a character
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/characters/${id}`);
      setCharacters(characters.filter((char) => char._id !== id)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting character:", error);
    }
  };

  const handleSaveCharacter = async (data) => {
    if (editData) {
      // Optimistically update the state
      setCharacters((prev) =>
        prev.map((char) =>
          char._id === editData._id ? { ...char, ...data } : char
        )
      );

      try {
        const response = await axios.put(`${BASE_URL}/characters/${editData._id}`, data);
        // Update the character with the response data in case there are any server-side changes
        setCharacters((prev) =>
          prev.map((char) =>
            char._id === editData._id ? { ...char, ...response.data } : char
          )
        );
      } catch (error) {
        console.error("Error updating character:", error);
      }
    } else {
      // Optimistically add the new character to the state
      setCharacters((prev) => [...prev, data]);

      try {
        const response = await axios.post(`${BASE_URL}/characters`, data);
        // Update the new character with the response data if necessary
        setCharacters((prev) =>
          prev.map((char) =>
            char._id === response.data._id ? { ...char, ...response.data } : char
          )
        );
      } catch (error) {
        console.error("Error adding character:", error);
      }
    }
  };


  const handleAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (character) => {
    setEditData(character);
    setIsModalOpen(true);
  };

  return (
    <>
      <AdminLayout>
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Manage Characters</h1>
            <button
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={handleAdd}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Character
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between mb-6">
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Search characters..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCharacters.map((char) => (
                    <tr key={char._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{char.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{char.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {char.tags.join(", ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{char.imagesCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleEdit(char)}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(char._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCharacters.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No characters found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        <CharacterFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCharacter}
          initialData={editData}
        />
      </AdminLayout>
    </>
  );
};

export default ManageCharacters;
