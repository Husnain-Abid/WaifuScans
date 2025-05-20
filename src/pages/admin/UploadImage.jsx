"use client"

import { useEffect, useState } from "react"
import { Upload, X, Trash2 } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import axios from "axios"
import { BASE_URL, IMG_URL } from "../../utils/apiURL"

const UploadImage = () => {
  const [characters, setCharacters] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)
  const [existingImages, setExistingImages] = useState([])

  const maxImages = 200
  const currentCount = selectedCharacter?.imagesCount || 0
  const totalAfterUpload = currentCount + files.length
  const canUpload = selectedCharacter && totalAfterUpload <= maxImages

  const fetchCharacterImages = async (characterId) => {
    try {
      const res = await axios.get(`${BASE_URL}/character-images/${characterId}`)
      setExistingImages(res.data)
    } catch (err) {
      console.error("Failed to fetch character images:", err)
    }
  }

  const handleCharacterChange = (e) => {
    const selectedId = e.target.value
    const character = characters.find(c => c._id === selectedId)
    setSelectedCharacter(character)
    setFiles([])
    fetchCharacterImages(selectedId)
  }

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    if (currentCount + files.length + newFiles.length > maxImages) {
      alert("200 image limit exceeded.")
      return
    }
    setFiles(prev => [...prev, ...newFiles])
  }

  const updateCharacterImageCount = (characterId, delta) => {
    setCharacters(prev =>
      prev.map(char =>
        char._id === characterId
          ? { ...char, imagesCount: Math.max(0, char.imagesCount + delta) }
          : char
      )
    )
    setSelectedCharacter(prev =>
      prev && prev._id === characterId
        ? { ...prev, imagesCount: Math.max(0, prev.imagesCount + delta) }
        : prev
    )
  }

  const handleUpload = async () => {
    if (!selectedCharacter) return alert("Please select a character.")
    if (totalAfterUpload > maxImages) return alert("Character cannot have more than 200 images.")

    const formData = new FormData()
    formData.append("characterId", selectedCharacter._id)
    files.forEach(file => formData.append("images", file))

    try {
      const res = await axios.post(`${BASE_URL}/character-images`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      alert("Upload successful.")
      setFiles([])
      fetchCharacterImages(selectedCharacter._id)
      updateCharacterImageCount(selectedCharacter._id, res.data.length)

    } catch (err) {
      console.error(err)
      alert(err.response?.data?.error || "Upload failed.")
    }
  }

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Delete this image?")) return
    try {
      await axios.delete(`${BASE_URL}/character-images/${imageId}`)
      fetchCharacterImages(selectedCharacter._id)
updateCharacterImageCount(selectedCharacter._id, -1)
    } catch (err) {
      console.error(err)
      alert("Failed to delete image.")
    }
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/characters`)
      .then(res => setCharacters(res.data))
      .catch(err => {
        console.error("Failed to fetch characters:", err)
        alert("Failed to load characters")
      })
  }, [])

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Images</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 space-y-4">
          <label className="block mb-2 font-medium text-gray-700">Select Character:</label>
          <select
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            onChange={handleCharacterChange}
            value={selectedCharacter?._id || ""}
          >
            <option value="">-- Choose a Character --</option>
            {characters.map(char => (
              <option key={char._id} value={char._id}>
                {char.name} ({char.imagesCount}/200 images)
              </option>
            ))}
          </select>

          {selectedCharacter && (
            <>
              <p className="text-sm text-gray-600">
                Uploading to: <strong>{selectedCharacter.name}</strong> – {currentCount} images
              </p>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition ${dragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"}`}
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault(); setDragging(false)
                  const dropped = Array.from(e.dataTransfer.files)
                  if (currentCount + files.length + dropped.length > maxImages) {
                    alert("200 image limit exceeded.")
                    return
                  }
                  setFiles(prev => [...prev, ...dropped])
                }}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Drag & drop images or browse</p>
                <label className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700">
                  Browse Files
                  <input type="file" multiple hidden accept="image/*" onChange={handleFileChange} />
                </label>
              </div>
            </>
          )}
        </div>

        {files.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Images to Upload ({files.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {files.map((file, idx) => (
                <div key={idx} className="relative group">
                  <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-32 object-cover rounded" />
                  <button
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                    onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={handleUpload}
                disabled={!canUpload}
                className={`px-4 py-2 text-white rounded ${canUpload ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"}`}
              >
                Upload All
              </button>
            </div>
          </div>
        )}

        {selectedCharacter && existingImages.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Uploaded Images ({existingImages.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {existingImages.map(image => (
                <div key={image._id} className="relative group">
                  <img src={`${IMG_URL}${image.imageUrl}`} alt="uploaded" className="w-full h-32 object-cover rounded" />
                  <button
                    onClick={() => handleDeleteImage(image._id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default UploadImage
