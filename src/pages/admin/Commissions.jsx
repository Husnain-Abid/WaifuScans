"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import { BASE_URL } from "../../utils/apiURL";
import debounce from 'lodash.debounce';
import { useCallback, useRef } from 'react';


export default function CommissionTabsAdmin() {
  const [tabs, setTabs] = useState({});
  const [activeTabKey, setActiveTabKey] = useState("");

  const debounceSaveRef = useRef({});
  const debounceTitleSaveRef = useRef({});

  const debouncedSave = useCallback((tabId, updatedContent) => {
    // Avoid creating a new debounce function each time
    if (!debounceSaveRef.current[tabId]) {
      debounceSaveRef.current[tabId] = debounce(async (contentToSave) => {
        try {
          const { data } = await axios.put(`${BASE_URL}/commission/${tabId}`, {
            ...tabs[tabId],
            content: contentToSave,
          });
          setTabs((prev) => ({
            ...prev,
            [tabId]: data,
          }));
        } catch (err) {
          console.error("Debounced save failed:", err);
        }
      }, 600); // 600ms delay
    }

    debounceSaveRef.current[tabId](updatedContent);
  }, [tabs]);


  // 🔁 Load tabs on mount
  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/commission`);
        const mappedTabs = {};
        data.forEach((tab) => {
          mappedTabs[tab._id] = tab;
        });
        setTabs(mappedTabs);
        if (Object.keys(mappedTabs).length > 0) {
          setActiveTabKey(Object.keys(mappedTabs)[0]);
        }
      } catch (err) {
        console.error("Error loading tabs:", err);
      }
    };
    fetchTabs();
  }, []);

  // ---- Tab Operations ----
  const handleAddTab = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/commission`, {
        title: "New Tab",
        content: [],
      });
      setTabs((prev) => ({
        ...prev,
        [data._id]: data,
      }));
      setActiveTabKey(data._id);
    } catch (err) {
      console.error("Error creating tab:", err);
    }
  };

const handleEditTabTitle = (newTitle) => {
  const tab = tabs[activeTabKey];

  // Update UI immediately
  setTabs((prev) => ({
    ...prev,
    [tab._id]: {
      ...tab,
      title: newTitle,
    },
  }));

  // Create a debounce function if not already cached
  if (!debounceTitleSaveRef.current[tab._id]) {
    debounceTitleSaveRef.current[tab._id] = debounce(async (titleToSave) => {
      try {
        const { data } = await axios.put(`${BASE_URL}/commission/${tab._id}`, {
          ...tab,
          title: titleToSave,
        });
        setTabs((prev) => ({
          ...prev,
          [tab._id]: data,
        }));
      } catch (err) {
        console.error("Failed to save debounced title:", err);
      }
    }, 600); // delay in ms
  }

  // Call debounced save
  debounceTitleSaveRef.current[tab._id](newTitle);
};


  const handleDeleteTab = async () => {
    try {
      await axios.delete(`${BASE_URL}/commission/${activeTabKey}`);
      const updatedTabs = { ...tabs };
      delete updatedTabs[activeTabKey];
      setTabs(updatedTabs);
      setActiveTabKey(Object.keys(updatedTabs)[0] || "");
    } catch (err) {
      console.error("Failed to delete tab:", err);
    }
  };

  // ---- Entry Operations ----
  const handleAddEntry = async () => {
    const tab = tabs[activeTabKey];
    const updatedContent = [
      ...tab.content,
      { label: "New Label", description: "New description..." },
    ];
    try {
      const { data } = await axios.put(`${BASE_URL}/commission/${tab._id}`, {
        ...tab,
        content: updatedContent,
      });
      setTabs((prev) => ({
        ...prev,
        [tab._id]: data,
      }));
    } catch (err) {
      console.error("Failed to add entry:", err);
    }
  };

const handleEditEntry = (index, field, value) => {
  const tab = tabs[activeTabKey];
  const updatedContent = [...tab.content];
  updatedContent[index][field] = value;

  setTabs((prev) => ({
    ...prev,
    [activeTabKey]: {
      ...tab,
      content: updatedContent,
    },
  }));

  debouncedSave(activeTabKey, updatedContent);
};


  const handleDeleteEntry = async (index) => {
    const tab = tabs[activeTabKey];
    const updatedContent = tab.content.filter((_, i) => i !== index);
    try {
      const { data } = await axios.put(`${BASE_URL}/commission/${tab._id}`, {
        ...tab,
        content: updatedContent,
      });
      setTabs((prev) => ({
        ...prev,
        [tab._id]: data,
      }));
    } catch (err) {
      console.error("Failed to delete entry:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Commission Tab Manager</h1>
          <button
            onClick={handleAddTab}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 inline-block mr-2" />
            Add Tab
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(tabs).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTabKey(key)}
              className={`px-4 py-2 rounded ${activeTabKey === key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
                }`}
            >
              {tabs[key].title}
            </button>
          ))}
        </div>

        {/* Tab Editor */}
        {activeTabKey && tabs[activeTabKey] && (
          <div className="bg-white p-6 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <input
                value={tabs[activeTabKey].title}
                onChange={(e) => handleEditTabTitle(e.target.value)}
                className="text-xl font-semibold border-b-2 p-1 w-full mr-4"
              />

              <button
                onClick={handleDeleteTab}
                className="text-red-600 hover:underline"
              >
                <Trash2 className="w-4 h-4 inline-block mr-1" />
                Delete Tab
              </button>

            </div>

            <div className="space-y-4">
              {tabs[activeTabKey].content.map((entry, i) => (
                <div key={i} className="border p-4 rounded bg-gray-50">
                  <input
                    value={entry.label}
                    onChange={(e) =>
                      handleEditEntry(i, "label", e.target.value)
                    }
                    placeholder="Label"
                    className="block w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    value={entry.description}
                    onChange={(e) =>
                      handleEditEntry(i, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="block w-full p-2 border rounded"
                  />
                  <button
                    onClick={() => handleDeleteEntry(i)}
                    className="mt-2 text-red-500 hover:underline"
                  >
                    <Trash2 className="w-4 h-4 inline-block mr-1" />
                    Delete Entry
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddEntry}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 inline-block mr-2" />
              Add Entry
            </button>
          </div>
        )}


      </div>
    </AdminLayout>
  );
}
