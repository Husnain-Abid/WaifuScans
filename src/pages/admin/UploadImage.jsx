"use client"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"

// Mock characters with image count
const mockCharacters = [
  { id: 1, name: "Goku", imagesCount: 150 },
  { id: 2, name: "Vegeta", imagesCount: 199 },
  { id: 3, name: "Bulma", imagesCount: 50 },
]

const UploadImage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)

  const handleCharacterChange = (e) => {
    const selectedId = parseInt(e.target.value)
    const character = mockCharacters.find(c => c.id === selectedId)
    setSelectedCharacter(character)
    setFiles([]) // Clear old uploads if character changes
  }

  const maxImages = 200
  const currentCount = selectedCharacter?.imagesCount || 0
  const totalAfterUpload = currentCount + files.length

  const canUpload = selectedCharacter && totalAfterUpload <= maxImages

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    if (currentCount + files.length + droppedFiles.length > maxImages) return alert("200 image limit exceeded.")
    setFiles(prev => [...prev, ...droppedFiles])
  }

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    if (currentCount + files.length + newFiles.length > maxImages) return alert("200 image limit exceeded.")
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (index) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
  }

  const handleUpload = () => {
    if (!selectedCharacter) return alert("Please select a character.")
    if (totalAfterUpload > maxImages) return alert("Character cannot have more than 200 images.")
    alert(`${files.length} images uploaded for ${selectedCharacter.name}. (Mock Upload)`)
    setFiles([])
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Images</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Select Character:</label>
            <select
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              onChange={handleCharacterChange}
              value={selectedCharacter?.id || ""}
            >
              <option value="">-- Choose a Character --</option>
              {mockCharacters.map((char) => (
                <option key={char.id} value={char.id}>
                  {char.name} ({char.imagesCount}/200 images)
                </option>
              ))}
            </select>
          </div>

          {selectedCharacter && (
            <>
              <p className="text-sm text-gray-600">
                Uploading to: <strong>{selectedCharacter.name}</strong> &middot; Current: {currentCount} images
              </p>

              {currentCount >= maxImages && (
                <p className="text-red-600 text-sm font-medium">
                  This character already has 200 images. You can't upload more.
                </p>
              )}

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition ${dragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
                  }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex justify-center mb-4">
                  <Upload className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-gray-700 mb-2">Drag & drop images here</p>
                <p className="text-gray-500 text-sm mb-4">Supported: JPG, PNG, GIF (Max 5MB each)</p>
                <label className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer">
                  <span>Browse Files</span>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </>
          )}
        </div>

        {files.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Images to Upload ({files.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="rounded-lg w-full h-32 object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="mt-1 text-sm text-gray-500 truncate">{file.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                disabled={!canUpload}
                className={`px-4 py-2 rounded-md text-white ${canUpload ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"}`}
                onClick={handleUpload}
              >
                Upload All
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default UploadImage
