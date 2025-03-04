import { useState, useEffect } from "react";
import axios from "axios";

function Uploadimg() {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/images");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image.");
      return;
    }

    if (images.length >= 8) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post("http://localhost:4000/api/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSelectedFile(null);
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>

      <div className="flex items-center space-x-4 mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Uploaded Images</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img._id}
            className="w-32 h-32 rounded-lg overflow-hidden shadow-md border border-gray-300 flex items-center justify-center bg-gray-100"
          >
            <img
              src={`data:${img.contentType};base64,${img.imageBase64}`}
              alt="uploaded"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Uploadimg;
