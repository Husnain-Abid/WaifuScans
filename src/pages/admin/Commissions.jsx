"use client";
import { useState } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";

export default function CommissionTabsAdmin() {
  const [tabs, setTabs] = useState({
    guide: {
      title: "Guide",
      content: [
        { label: "Understand the Process:", description: "How it works..." },
      ],
    },
    request: {
      title: "How to Request",
      content: [],
    },
  });

  const [activeTabKey, setActiveTabKey] = useState(Object.keys(tabs)[0]);

  // ---- Tab Operations ----
  const handleAddTab = () => {
    const newKey = `tab${Date.now()}`;
    setTabs((prev) => ({
      ...prev,
      [newKey]: {
        title: "New Tab",
        content: [],
      },
    }));
    setActiveTabKey(newKey);
  };

  const handleEditTabTitle = (newTitle) => {
    setTabs((prev) => ({
      ...prev,
      [activeTabKey]: {
        ...prev[activeTabKey],
        title: newTitle,
      },
    }));
  };

  const handleDeleteTab = () => {
    const updatedTabs = { ...tabs };
    delete updatedTabs[activeTabKey];
    const newActive = Object.keys(updatedTabs)[0];
    setTabs(updatedTabs);
    setActiveTabKey(newActive || "");
  };

  // ---- Entry Operations ----
  const handleAddEntry = () => {
    setTabs((prev) => ({
      ...prev,
      [activeTabKey]: {
        ...prev[activeTabKey],
        content: [
          ...prev[activeTabKey].content,
          { label: "New Label", description: "New description..." },
        ],
      },
    }));
  };

  const handleEditEntry = (index, field, value) => {
    const updatedEntries = [...tabs[activeTabKey].content];
    updatedEntries[index][field] = value;
    setTabs((prev) => ({
      ...prev,
      [activeTabKey]: {
        ...prev[activeTabKey],
        content: updatedEntries,
      },
    }));
  };

  const handleDeleteEntry = (index) => {
    const filtered = tabs[activeTabKey].content.filter((_, i) => i !== index);
    setTabs((prev) => ({
      ...prev,
      [activeTabKey]: {
        ...prev[activeTabKey],
        content: filtered,
      },
    }));
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
              className={`px-4 py-2 rounded ${
                activeTabKey === key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {tabs[key].title}
            </button>
          ))}
        </div>

        {/* Active Tab Editor */}
        {activeTabKey && tabs[activeTabKey] && (
          <div className="bg-white p-6 rounded shadow">
            {/* Edit Tab Title */}
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

            {/* Entry List */}
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
