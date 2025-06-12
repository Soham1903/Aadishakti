import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

function Uploadimg() {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "https://aadishakti-backend-ue51.onrender.com/api/images"
      );
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
      alert("You can upload a maximum of 8 images.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post(
        "https://aadishakti-backend-ue51.onrender.com/api/images/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSelectedFile(null);
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(
        `https://aadishakti-backend-ue51.onrender.com/api/images/${imageId}`
      );
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-[#87161a] text-center">
        Image Upload Portal
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#87161a]"
        />
        <button
          onClick={handleUpload}
          className="bg-[#87161a] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#7a1536] transition duration-200"
        >
          Upload
        </button>
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-[#87161a]">
        Uploaded Images ({images.length}/8)
      </h3>

      {images.length === 0 ? (
        <p className="text-gray-500 text-center">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {images.map((img, index) => (
            <div
              key={img._id}
              className="relative rounded-xl overflow-hidden shadow-md border border-gray-200 bg-gray-50"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <img
                src={`data:${img.contentType};base64,${img.imageBase64}`}
                alt="uploaded"
                className="w-full h-40 object-cover transition duration-200 ease-in-out transform hover:scale-105"
              />
              {hoverIndex === index && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition duration-200 cursor-pointer"
                  onClick={() => handleDeleteImage(img._id)}
                >
                  <Trash2 className="text-white w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Uploadimg;
